import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

/**
 * Retrieves all professors ordered alphabetically by name.
 * Useful for dropdowns or search lists.
 */
export const getAllProfessors = async () => {
  return await prisma.professor.findMany({
    orderBy: { full_name: 'asc' },
  });
};

/**
 * Retrieves a single professor by ID.
 * Includes:
 * 1. Their teaching history (Commissions).
 * 2. Their reviews (ReviewProfessorDetail).
 */
export const getProfessorById = async (id: number) => {
  return await prisma.professor.findUnique({
    where: { id },
    include: {
      commissions: {
        include: {
          commission: {
            include: { subject: true }
          }
        },
        orderBy: {
          commission: { year: 'desc' }
        }
      },
      reviews: {
        include: {
          review: true
        }
      }
    },
  });
};

/**
 * Creates a new professor.
 * @param data - { full_name }
 */
export const createProfessor = async (data: Prisma.ProfessorCreateInput) => {
  return await prisma.professor.create({
    data,
  });
};

/**
 * Updates an existing professor's details.
 */
export const updateProfessor = async (id: number, data: Prisma.ProfessorUpdateInput) => {
  return await prisma.professor.update({
    where: { id },
    data,
  });
};

/**
 * Deletes a professor with specific business logic:
 * 1. DELETES all Reviews associated with this professor.
 * 2. UNASSIGNS the professor from all Commissions (does NOT delete the commission).
 * 3. DELETES the Professor record.
 * * Uses a database transaction to ensure data integrity.
 */
export const deleteProfessor = async (id: number) => {
  return await prisma.$transaction(async (tx) => {
    const reviewsToDelete = await tx.reviewProfessorDetail.findMany({
      where: { professorId: id },
      select: { reviewId: true }
    });

    if (reviewsToDelete.length > 0) {
      await tx.review.deleteMany({
        where: {
          id: { in: reviewsToDelete.map(r => r.reviewId) }
        }
      });
    }

    // This automatically deletes the professor from commissions
    return await tx.professor.delete({
      where: { id }
    });
  });
};

/**
 * Searches for professors by name (partial match).
 * Useful for autocomplete search bars.
 */
export const searchProfessorsByName = async (query: string) => {
  return await prisma.professor.findMany({
    where: {
      full_name: {
        contains: query,
        mode: 'insensitive', // Case insensitive search
      },
    },
    take: 10, // Limit results
  });
};