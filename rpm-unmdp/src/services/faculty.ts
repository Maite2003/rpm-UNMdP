import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

/**
 * Retrieves all faculties associated with a specific university.
 * Ordered alphabetically by name.
 * Includes a count of careers for dashboard display.
 */
export const getFacultiesByUniversity = async (universityId: string) => {
  return await prisma.faculty.findMany({
    where: { universityId },
    orderBy: {
      name: 'asc',
    },
    include: {
      _count: {
        select: { careers: true },
      },
    },
  });
};

/**
 * Retrieves a single faculty by its ID.
 * Includes the faculty data for context.
 */
export const getFacultyById = async (id: string) => {
  return await prisma.faculty.findUnique({
    where: { id },
    include: {
      university: {
        select: {
          id: true,
          name: true
        }
      },
      careers: {
        orderBy: { name: 'asc' },
        include: {
          _count: {
            select: { studyPlans: true }
          }
        }
      }
    }
  });
};

/**
 * Creates a new faculty.
 * Uses UncheckedCreateInput to allow passing 'universityId' directly.
 */
export const createFaculty = async (data: Prisma.FacultyUncheckedCreateInput) => {
  return await prisma.faculty.create({
    data,
  });
};

/**
 * Updates an existing faculty.
 */
export const updateFaculty = async (id: string, data: Prisma.FacultyUncheckedUpdateInput) => {
  return await prisma.faculty.update({
    where: { id },
    data,
  });
};

/**
 * Deletes a faculty by its ID.
 */
export const deleteFaculty = async (id: string) => {
  return await prisma.faculty.delete({
    where: { id },
  });
};