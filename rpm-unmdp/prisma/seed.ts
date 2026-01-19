import { CommissionRole, DocType, Semester, StudentStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { saltAndHashPassword } from "@/lib/password";

async function main() {
  // --------------------------------------------------------------
  // 1. UNIVERSITIES (Simulación CSV)
  // --------------------------------------------------------------
  const universitiesData = [
    { name: 'Universidad Nacional de Mar del Plata', abbreviation: 'UNMDP', website:'https://www.mdp.edu.ar/'}
  ];

  // --------------------------------------------------------------
  // 2. FACULTIES
  // --------------------------------------------------------------
  const facultiesData = [
    { name: 'Facultad de Ingeniería', abbreviation: 'FI'}
  ];

  // --------------------------------------------------------------
  // 3. CAREERS
  // --------------------------------------------------------------
  const careersData = [
    { name: 'Ingeniería en Informática' }
  ];

  // --------------------------------------------------------------
  // 4. PLANES
  // --------------------------------------------------------------

  const plansData = [
    { year: 2010, subjectCount: 40, totalYears: 5  },
    { year: 2024, subjectCount: 37, totalYears: 5 }
  ];

  // --------------------------------------------------------------
  // 5. SUBJECTS (Materias Sueltas)
  // --------------------------------------------------------------
  const subjectsData = [
    { name: 'Introducción a la Programación', code:'AA5', credits: 4, hours: 64 },
    { name: 'Análisis Matemático I', code: 'BB2', credits: 5, hours: 80 },          
    { name: 'Física I', code: 'ZS2', credits: 4, hours: 64 }                       
  ];

  // --------------------------------------------------------------
  // 6. PROFESSORS
  // --------------------------------------------------------------
  const professorsData = [
    { full_name: 'Alberto Einstein' }, // 0 - El Profe Bueno
    { full_name: 'Severus Snape' }     // 1 - El Profe Malo
  ];

  // --------------------------------------------------------------
  // 7. USERS
  // --------------------------------------------------------------
  // Password será 'password123' para todos
  const hashedPassword = await saltAndHashPassword('password123');

  const usersData = [
    {
      email: 'admin@unmdp.edu.ar',
      firstName: 'Admin',
      lastName: 'Supremo',
      docType: DocType.DNI,
      docNumber: '11111111',
      studentStatus: StudentStatus.NOT_STUDENT,
      isAdmin: true
    },
    {
      email: 'student@unmdp.edu.ar',
      firstName: 'Pepito',
      lastName: 'Estudiante',
      docType: DocType.DNI,
      docNumber: '22222222',
      studentStatus: StudentStatus.VERIFIED,
      isAdmin: false
    }
  ];
  // 1. Crear Universidad
  console.log('🏫 Creando Universidad...');
  const uni = await prisma.university.create({ data: universitiesData[0] });

  // 2. Crear Facultad
  console.log('Building Creando Facultad...');
  const faculty = await prisma.faculty.create({
    data: {
      ...facultiesData[0],
      universityId: uni.id
    }
  });

  // 3. Crear Carrera
  console.log('🎓 Creando Carrera...');
  const career = await prisma.career.create({
    data: {
      name: careersData[0].name,
      facultyId: faculty.id
    }
  });

  // 4. Crear Materias
  console.log('📚 Creando Materias...');
  const subjects = [];
  for (const sub of subjectsData) {
    const s = await prisma.subject.create({ data: sub });
    subjects.push(s);
  }

  // 5. Crear Plan de Estudio (Plan 2010)
  console.log('📜 Creando Plan de Estudio...');
  const plan1 = await prisma.studyPlan.create({
    data: {
      careerId: career.id,
      ...(plansData[0])
    }
  });
  const plan2 = await prisma.studyPlan.create({
    data: {
      careerId: career.id,
      ...(plansData[1])
    }
  });

  // 6. Asignar materias al plan
  // Intro -> 1ro Año, 1er Cuatrimestre
  await prisma.studyPlanSubject.create({
    data: { planId: plan1.id, subjectId: subjects[0].id, year: 1, semester: Semester.FIRST }
  });
  // Mate -> 1ro Año, 1er Cuatrimestre
  await prisma.studyPlanSubject.create({
    data: { planId: plan1.id, subjectId: subjects[1].id, year: 1, semester: Semester.FIRST }
  });

  // Mate -> 1ro Año, 2er Cuatrimestre
  await prisma.studyPlanSubject.create({
    data: { planId: plan2.id, subjectId: subjects[2].id, year: 1, semester: Semester.FIRST }
  });

  // 7. Crear Profesores
  console.log('👨‍🏫 Creando Profesores...');
  const professors = [];
  for (const prof of professorsData) {
    const p = await prisma.professor.create({ data: prof });
    professors.push(p);
  }

  // 8. Crear Comisiones (Cursadas Reales)
  console.log('🗓️ Creando Comisiones...');

  // Comisión 1: Intro a la Programación - 2024 - Einstein
  const comm1 = await prisma.commission.create({
    data: {
      year: 2024,
      semester: Semester.FIRST,
      subjectId: subjects[0].id, // Intro
    }
  });

  await prisma.commissionProfessor.create({
    data: {
      commissionId: comm1.id,
      professorId: professors[0].id, // Einstein
      role: CommissionRole.THEORY_PROFESSOR
    }
  });

  // Comisión 2: Intro a la Programación - 2024 - Snape
  const comm2 = await prisma.commission.create({
    data: {
      year: 2024,
      semester: Semester.FIRST,
      subjectId: subjects[0].id, // Intro (Misma materia, otra comisión)
    }
  });

  await prisma.commissionProfessor.create({
    data: {
      commissionId: comm2.id,
      professorId: professors[1].id, // Snape
      role: CommissionRole.PRACTICE_PROFESSOR
    }
  });

  // 9. Crear Usuarios
  console.log('👥 Creando Usuarios...');
  for (const u of usersData) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        ...u,
        password: hashedPassword
      }
    });
  }

  console.log('✅ Seed completado con éxito.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });