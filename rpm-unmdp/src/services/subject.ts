import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

/**
 * Retrieves all subjects ordered alphabetically.
 */
export const getAllSubjects = async () => {
  return await prisma.subject.findMany({
    orderBy: { name: 'asc' },
  });
};

/**
 * Creates a new generic Subject.
 */
export const createSubject = async (data: Prisma.SubjectCreateInput) => {
  return await prisma.subject.create({
    data,
  });
};

/**
 * Updates a subject.
 */
export const updateSubject = async (id: number, data: Prisma.SubjectUpdateInput) => {
  return await prisma.subject.update({
    where: { id },
    data,
  });
};

/**
 * Deletes a subject.
 */
export const deleteSubject = async (id: number) => {
  return await prisma.subject.delete({
    where: { id },
  });
};

/**
 * Adds a correlativity rule (Prerequisite).
 * @param predecessorId - The subject that must be passed first (e.g., Math I).
 * @param successorId - The subject that requires the previous one (e.g., Math II).
 */
export const addCorrelation = async (predecessorId: number, successorId: number) => {
  return await prisma.correlation.create({
    data: {
      predecessorId,
      successorId,
    },
  });
};

/**
 * Removes a correlativity rule.
 */
export const removeCorrelation = async (predecessorId: number, successorId: number) => {
  return await prisma.correlation.delete({
    where: {
      predecessorId_successorId: {
        predecessorId,
        successorId,
      },
    },
  });
};