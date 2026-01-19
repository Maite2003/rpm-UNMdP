'use server'

import { careerSchema, CareerValues } from "@/lib/schemas/career";
import { createCareer, deleteCareer, updateCareer } from "@/services/career"
import { revalidatePath } from "next/cache";


export async function deleteCareerAction( careerId: string, facultyId:string, universityId: string ) {
  try {
    await deleteCareer(careerId);

    revalidatePath(`/admin/academic/universities/${universityId}/faculties/${facultyId}`);
    revalidatePath(`/admin/academic/universities/${universityId}`);

    return { success: true, message: 'Carrera eliminada exitosamente' };
  } catch (error) {
    return { success: false, message: 'Error al eliminar la carrera' }
  }
}

export async function updateCareerAction( careerId: string, facultyId: string, universityId: string, data: CareerValues) {
  try {
    await updateCareer(careerId, data);

    revalidatePath(`/admin/academic/universities/${universityId}/faculties/${facultyId}/careers/${careerId}`);
    revalidatePath(`/admin/academic/universities/${universityId}/faculties/${facultyId}`);

    return { success: true, message: 'Carrera actualizada exitosamente'};
  } catch (error) {
    return { success: false, message: 'Error al actualizar la carrera' }
  }
}

export async function createCareerAction(facultyId: string, universityId: string, prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const subjectCount = formData.get('subjectCount') as string;
  const years = formData.get('years') as string;

  const result = careerSchema.safeParse({ name, subjectCount, years });

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  try {
    const data = {
      name, 
      subjectCount: Number(subjectCount),
      years: Number(years),
      facultyId
    };
    await createCareer(data);
    revalidatePath(`/admin/academic/universities/${universityId}`);
    revalidatePath(`/admin/academic/universities/${universityId}/faculties/${facultyId}`); 

    return { success: true, message: 'Carrera creada exitosamente' };
  } catch (error) {
    return { success: false, message: 'Error al crear la carrera' }
  }
}