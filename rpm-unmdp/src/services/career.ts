import { prisma } from '@/lib/prisma';
import { Prisma } from '@/generated/prisma/client';

/**
 * Retrieves all careers belonging to a specific faculty.
 * Ordered alphabetically by name.
 */
export const getCareersByFaculty = async (facultyId: string) => {
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
export const getCareerWithPlansById = async (careerId: string, planId?: string) => {
  const career = await prisma.career.findUnique({
    where: { id: careerId },
    include: {
      faculty: {
        include: { university: true }
      },
      studyPlans: {
        orderBy: { year: 'desc' },
        select: { id: true, year: true }
      }
    }
  });

  if (!career) return null;

  const activePlanId = planId || career.studyPlans[0]?.id;
  let selectedPlan = null;

  if (activePlanId) {
    selectedPlan = await prisma.studyPlan.findUnique({
      where: { id: activePlanId },
      include: {
        subjects: {
          orderBy: [{ year: 'asc' }]
        },
        _count: { select: { subjects: true } }
      }
    });
  }

  return { career, selectedPlan };
};

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
export const updateCareer = async (id: string, data: Prisma.CareerUncheckedUpdateInput) => {
  return await prisma.career.update({
    where: { id },
    data,
  });
}

/**
 * Deletes a career by its ID.
 * Will cascade delete associated Study Plans and Enrollments.
 */
export const deleteCareer = async (id: string) => {
  return await prisma.career.delete({
    where: { id }
  })
}