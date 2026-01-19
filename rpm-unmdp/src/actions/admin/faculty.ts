'use server';

import { facultySchema, FacultyValues } from '@/lib/schemas/faculty';
import { createFaculty, deleteFaculty, updateFaculty } from '@/services/faculty';
import { revalidatePath } from 'next/cache';

export async function createFacultyAction(universityId: string, prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const abbreviation = formData.get('abbreviation') as string;

  const result = facultySchema.safeParse({ name, abbreviation });

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  try {
    const data = {
      name,
      abbreviation: abbreviation || null,
      universityId: universityId
    };
    await createFaculty(data);

    revalidatePath(`/admin/academic/universities/${universityId}`);
    revalidatePath(`/admin/academic/universities`);
    return { success: true, message: 'Facultad creada exitosamente' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Error al crear la facultad' };
  }
}

export async function deleteFacultyAction(facultyId: string, universityId: string) {
  try {
    await deleteFaculty(facultyId);

    revalidatePath(`/admin/academic/universities/${universityId}`);
    revalidatePath(`/admin/academic/universities`);

    return { success: true, message: 'Facultad eliminada exitosamente' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Error al borrar la facultad' };
  }
}

export async function updateFacultyAction(facultyId: string, values: FacultyValues, universityId: string) {
  const result = facultySchema.safeParse(values);
  if (!result.success) {
    return { error: "Datos inválidos", message: result.error.issues[0].message };
  }

  try {
    await updateFaculty(facultyId, result.data);

    revalidatePath(`/admin/academic/universities/${universityId}/faculties/${facultyId}`);
    revalidatePath(`/admin/academic/universities/${universityId}`);

    return { success: true, message: 'Facultad actualizada exitosamente' };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar la facultad" };
  }
}