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
- Materias con sus comisiones

### Rutas
- admin/academic/universities es una lista de universidades con opcion de ir a la pagina de la universidad o eliminar universidad
- admin/academic/unievrsities/universityId tiene formulario para editar info de la unievrsidad, boton para agregar facultades y lista de facultades de la universidad (con conteo de carreras por facultad)
- admin/academic/universities/universityId/faculties/facultyId tiene un formulario para editar info de la facultad, boton para agregar carreras y lista de carreras (con conteo de planes de estudio por carreras)
- admin/academic/universities/universityId/faculties/facultyId/careers/careerId?planId= tiene un formulario para editar info de la carrera, un dropdown para seleccionar el plan que se esta visualizando actualmente, un boton para agregar un plan, un boton para agregar materias al plan seleccionado actualmente y una lista de las materias de el plan seleccionado, dividido por años y cuatrimestres. Cada materia tiene un boton para editar (tanto la materia en si, como su posicion en el plan de estudios seleccionado) y un boton para borrar (del plan de estudios seleccionado (deberia permitir tambien borrar por completo?)). 

## Privacidad
Dar la opcion de que las reseñas sean anonimas