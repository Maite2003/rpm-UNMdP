import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';

/**
 * Retrieves all careers belonging to a specific faculty.
 * Ordered alphabetically by name.
 */
export const getCareersByFaculty = async (facultyId: number) => {
  return await prisma.career.findMany({
    where: { facultyId },
    orderBy: {
      name: 'asc'
    },
    include: {
      _count: {
        select: {
          studyPlans: true,
          enrollments: true,
        },
      },
    },
  });
}

/**
 * Retrieves a single career by its ID.
 * Includes the Faculty name and the currently ACTIVE study plan.
 */
export const getCareerById = async (id: number) => {
  return await prisma.career.findUnique({
    where: { id },
    include: {
      faculty: true,
      studyPlans: {
        where: { isActive: true },
      }
    }
  });
}

/**
 * Creates a new career.
 * Uses UncheckedCreateInput to pass 'facultyId' directly.
 */
export const createCareer = async (data: Prisma.CareerUncheckedCreateInput) => {
  return await prisma.career.create({
    data,
  });
}

/**
 * Updates an existing career.
 */
export const updateCareer = async (id: number, data: Prisma.CareerUncheckedCreateInput) => {
  return await prisma.career.update({
    where: { id },
    data,
  });
}

/**
 * Deletes a career by its ID.
 * Will cascade delete associated Study Plans and Enrollments.
 */
export const deleteCareer = async (id: number) => {
  return await prisma.career.delete({
    where: { id }
  })
}