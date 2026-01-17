import { prisma } from "@/lib/prisma";
import { Prisma, CommissionRole } from "@/generated/prisma/client";

/**
 * Only fetches ACTIVE commissions.
 * Hidden commissions (soft deleted) are ignored in lists.
 * Useful for search pages or listing commission history for a subject.
 * * @param filters - Optional object to filter by subjectId or year.
 */
export const getCommissions = async (filters: {
  subjectId?: number,
  year?: number
} = {}) => {
  return await prisma.commission.findMany({
    where: {
      subjectId: filters.subjectId,
      year: filters.year,
      isDeleted: true,
    },
    include: {
      subject: true,
      professors: {
        include: {
          professor: true,
        },
      },
      _count: {
        select: { reviews: true } // Count how many reviews this commission has
      }
    },
    orderBy: { year: 'desc' },
  });
};

/**
 * Retrieves a single commission by its unique ID.
 * Includes detailed information about professors and reviews.
 */
export const getCommissionById = async (id: number) => {
  return await prisma.commission.findUnique({
    where: { id },
    include: {
      subject: true,
      professors: {
        include: {
          professor: true,
        },
      },
      reviews: {
        select: {
          id: true,
          date: true,
          student: { select: { id: true } }
        }
      }
    },
  });
};

/**
 * Creates a new commission.
 * @param data - Contains year, semester, subjectId, and optional schedules.
 */
export const createCommission = async (data: Prisma.CommissionUncheckedCreateInput) => {
  return await prisma.commission.create({
    data,
  });
};

/**
 * Assigns a professor to an existing commission with a specific role.
 */
export const addProfessorToCommission = async (
  commissionId: number,
  professorId: number,
  role: CommissionRole
) => {
  return await prisma.commissionProfessor.create({
    data: {
      commissionId,
      professorId,
      role,
    },
  });
};

/**
 * Unassigns a professor from a commission.
 * This deletes the link in the pivot table but preserves both the Commission and Professor.
 */
export const removeProfessorFromCommission = async (commissionId: number, professorId: number) => {
  return await prisma.commissionProfessor.delete({
    where: {
      commissionId_professorId: {
        commissionId,
        professorId,
      },
    },
  });
};

/**
 * Instead of physically deleting, we mark it as deleted.
 * This preserves the reviews linked to this commission.
 */
export const deleteCommission = async (id: number) => {
  return await prisma.commission.update({
    where: { id },
    data: {
      isDeleted: true
    },
  });
};

/**
 * Deletes a commission entirely.
 */
export const hardDeleteCommission = async (id: number) => {
  return await prisma.commission.delete({ where: { id } });
}