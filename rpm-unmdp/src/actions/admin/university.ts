'use server';

import { prisma } from '@/lib/prisma';
import { universitySchema, UniversityValues } from '@/lib/schemas/university';
import { updateUniversity, createUniversity } from '@/services/university';
import { revalidatePath } from 'next/cache';

export async function createUniversityAction(prevState: any, formData: FormData) {
  const name = formData.get('name') as string;
  const abbreviation = formData.get('abbreviation') as string;
  const website = formData.get('website') as string;

  const result = universitySchema.safeParse({ name, abbreviation, website });

  if (!result.success) {
    return { success: false, message: result.error.issues[0].message };
  }

  try {
    const data = {
      name,
      abbreviation: abbreviation || null,
        website: website || null
    }
    await createUniversity(data);

    revalidatePath('/admin/academic/universities');
    return { success: true, message: 'Universidad creada correctamente' };
  } catch (error) {
    return { success: false, message: 'Error al crear la universidad' };
  }
}

export async function deleteUniversityAction(id: string) {
  try {
    await prisma.university.delete({ where: { id } });

    revalidatePath('/admin/academic/universities');
    return { success: true, message: 'Universidad eliminada con exito' };
  } catch (error) {
    return { success: false, message: 'No se puede borrar' };
  }
}

export async function updateUniversityAction(id: string, values: UniversityValues) {
  const result = universitySchema.safeParse(values);
  if (!result.success) {
    return { error: "Datos inválidos", message: 'Universidad actualizada con exito' };
  }

  try {
    await updateUniversity(id, result.data);

    revalidatePath(`/admin/academic/universities/${id}`);
    revalidatePath("/admin/academic/universities");

    return { success: true, message: 'Universidad actualizada con exito' };
  } catch (error) {
    console.error(error);
    return { error: "Error al actualizar en base de datos" };
  }
}