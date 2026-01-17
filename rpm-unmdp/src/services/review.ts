import { prisma } from "@/lib/prisma";
import { Prisma, ReviewType } from "@/generated/prisma/client";

/**
 * Retrieves reviews with dynamic filtering.
 * Can filter by Professor, Commission (Subject), or User.
 * Includes score calculation (likes - dislikes).
 */
export const getReviews = async (filters: {
  professorId?: number;
  subjectId?: number;
  studentId?: number;
}) => {
  return await prisma.review.findMany({
    where: {
      studentId: filters.studentId,
      // If filtering by professor, we look into the professor detail
      professorDetail: filters.professorId
        ? { professorId: filters.professorId }
        : undefined,
      // If filtering by subject, we look at the commission's subject
      commission: filters.subjectId
        ? { subjectId: filters.subjectId, isDeleted: false } // Show from history too.
        : undefined,
      status: "PUBLISHED",
    },
    include: {
      // Load the Commission to show context (Year, Semester, Subject)
      commission: {
        include: { subject: true }
      },
      // Load details based on type
      professorDetail: { include: { professor: true } },
      commissionDetail: true,
    },
    orderBy: { date: 'desc' },
  });
};

/**
 * Creates a PROFESSOR Review.
 * Uses a Transaction to create the Header (Review) and the Detail (ReviewProfessorDetail) atomically.
 */
export const createProfessorReview = async (
  userId: number,
  commissionId: number,
  professorId: number,
  content: string,
  scores: { treatment: number; explanation: number }, // 1-5 scale
  isAnonymous: boolean
) => {
  return await prisma.$transaction(async (tx) => {
    // Create the Parent Review
    const review = await tx.review.create({
      data: {
        studentId: userId,
        commissionId,
        content,
        type: "PROFESSOR",
        isAnonymous,
      }
    });

    // Create the Detail
    await tx.reviewProfessorDetail.create({
      data: {
        reviewId: review.id,
        professorId,
        treatmentScore: scores.treatment,
        explanationScore: scores.explanation,
      }
    });

    return review;
  });
};

/**
 * Creates a COMMISSION Review (Subject review).
 */
export const createCommissionReview = async (
  userId: number,
  commissionId: number,
  content: string,
  scores: { content: number; difficulty: number },
  isAnonymous: boolean
) => {
  return await prisma.$transaction(async (tx) => {
    const review = await tx.review.create({
      data: {
        studentId: userId,
        commissionId,
        content,
        type: "COMMISSION",
        isAnonymous,
      }
    });

    await tx.reviewCommissionDetail.create({
      data: {
        reviewId: review.id,
        contentScore: scores.content,
        difficultyScore: scores.difficulty,
      }
    });

    return review;
  });
};

/**
 * Handles Voting.
 * The database TRIGGER 'trg_sync_votes' handles the counting logic.
 */
export const voteReview = async (studentId: number, reviewId: number, isPositive: boolean) => {
  const existingVote = await prisma.vote.findUnique({
    where: {
      studentId_reviewId: { studentId, reviewId }
    }
  });

  if (existingVote) {
    if (existingVote.isPositive === isPositive) {
      return await prisma.vote.delete({
        where: { studentId_reviewId: { studentId, reviewId } }
      });
    } else {
      return await prisma.vote.update({
        where: { studentId_reviewId: { studentId, reviewId } },
        data: { isPositive }
      });
    }
  } else {
    return await prisma.vote.create({
      data: { studentId, reviewId, isPositive }
    });
  }
};

/**
 * Deletes a review.
 */
export const deleteReview = async (reviewId: number, studentId: number, isAdmin: boolean) => {
  // Only the author OR an admin can delete
  const review = await prisma.review.findUnique({ where: { id: reviewId } });

  if (!review) throw new Error("Review not found");
  if (review.studentId !== studentId && !isAdmin) {
    throw new Error("Unauthorized");
  }

  return await prisma.review.delete({
    where: { id: reviewId }
  });
};