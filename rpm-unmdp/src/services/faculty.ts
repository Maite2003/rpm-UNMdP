import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

/**
 * Retrieves all faculties associated with a specific university.
 * Ordered alphabetically by name.
 * Includes a count of careers for dashboard display.
 */
export const getFacultiesByUniversity = async (universityId: number) => {
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
 * Includes the university data for context.
 */
export const getFacultyById = async (id: number) => {
  return await prisma.faculty.findUnique({
    where: { id },
    include: {
      university: true,
      careers: {
        orderBy: { name: 'asc' }
      }
    },
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
export const updateFaculty = async (id: number, data: Prisma.FacultyUncheckedUpdateInput) => {
  return await prisma.faculty.update({
    where: { id },
    data,
  });
};

/**
 * Deletes a faculty by its ID.
 */
export const deleteFaculty = async (id: number) => {
  return await prisma.faculty.delete({
    where: { id },
  });
};