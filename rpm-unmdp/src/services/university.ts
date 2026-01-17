import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

/**
 * Retrieves all universities ordered alphabetically by name.
 * Includes a count of faculties for dashboard display.
 */
export const getUniversities = async () => {
  return await prisma.university.findMany({
    orderBy: {
      name: 'asc',
    },
    include: {
      _count: {
        select: { faculties: true },
      },
    },
  });
};

/**
 * Retrieves a single university by its ID.
 * Includes the full list of faculties associated with it.
 */
export const getUniversityById = async (id: number) => {
  return await prisma.university.findUnique({
    where: { id },
    include: {
      faculties: {
        orderBy: { name: 'asc' },
      },
    },
  });
};

/**
 * Creates a new university.
 * @param data - The data required to create a university (name, optional abbreviation).
 */
export const createUniversity = async (data: Prisma.UniversityCreateInput) => {
  return await prisma.university.create({
    data,
  });
};

/**
 * Updates an existing university.
 * @param id - The ID of the university to update.
 * @param data - The fields to update.
 */
export const updateUniversity = async (id: number, data: Prisma.UniversityUpdateInput) => {
  return await prisma.university.update({
    where: { id },
    data,
  });
};

/**
 * Deletes a university by its ID.
 */
export const deleteUniversity = async (id: number) => {
  return await prisma.university.delete({
    where: { id },
  });
};