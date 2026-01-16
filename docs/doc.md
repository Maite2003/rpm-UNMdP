## Seguridad y Validacion
Buscar una forma de registrar usuarios validando constancia de alumno regular, tomando la carrera del estudiante y permitir que el estudiante unicamente opine sobre materias/profesores de su carrera

## Entidades
- Facultad
- Estudiante
- Plan de estudio
- Carreras
- Materias: Pertenecen a una o mas carreras.
- Profesores.
- Comisiones: Instancia donde se cursaria. Los profesores se asocian a comisiones. Las comisiones pertenecen a materias
- Reseña
  - Reseña_profesor
  - Reseña_materia
- Voto

Se debe poder buscar por materia o por profesor.

## Tecnologia
- NextJS y Vercel
- Prisma
- Postgres y Neon
- Formularios de reseñas con Server Actions + Zod
- Auth.js para registro de usuarios
- TanStack Query

### Validacion de constancia
**OPC1:** Para la validacion de constancia de alumno regular, permitimos unicamente que el usuario cargue un pdf de la constancia de alumno regular y usar el QR que hay en el PDF para validar que el nombre del alumno coincida con el nombre y dni ingresado en el usuario.

**OPC2:** Hacer un regex y buscar palabras especificas como : Univerisdad Nacional de Mar del Plata, constancia, alumno, regular, nombre y apellido del alumno, etc

En ambos casos, cualquier constancia que no pase la validacion automatica iria para revision manual de los admins.

## Panel de Admin
Para manejar reportes de reseñas, validaciones automaticas inconclusas, etc.
Secciones:
- Reportes de reseñas
- Validaciones manuales de estudiantes
- Listado de profesores
- Listado de universidades, facultades
- Carreras y Planes
- Listado de materias con sus comisiones

## Privacidad
Permitir que las reseñas sean anonimas