import { prisma } from "@/lib/prisma";
import { Prisma, Semester } from "@/generated/prisma/client";

/**
 * Retrieves a Study Plan by ID with full structure.
 */
export const getStudyPlanById = async (id: number) => {
  return await prisma.studyPlan.findUnique({
    where: { id },
    include: {
      career: true,
      subjects: {
        orderBy: [
          { year: 'asc' },
          { semester: 'asc' }
        ],
        include: {
          subject: {
            include: {
              predecessors: { include: { predecessor: true } }
            }
          },
        },
      },
    },
  });
};

/**
 * Creates a new Study Plan header.
 * @param data - { careerId, year, isActive }
 */
export const createStudyPlan = async (data: Prisma.StudyPlanUncheckedCreateInput) => {
  return await prisma.studyPlan.create({
    data,
  });
};

/**
 * Adds a Subject to a Study Plan with specific timing.
 */
export const addSubjectToPlan = async (
  planId: number,
  subjectId: number,
  year: number,
  semester: Semester
) => {
  return await prisma.studyPlanSubject.create({
    data: {
      planId,
      subjectId,
      year,
      semester,
    },
  });
};

/**
 * Removes a Subject from a Study Plan.
 */
export const removeSubjectFromPlan = async (planId: number, subjectId: number) => {
  return await prisma.studyPlanSubject.delete({
    where: {
      planId_subjectId: {
        planId,
        subjectId,
      },
    },
  });
};

/**
 * Toggles the 'isActive' status of a plan.
 */
export const toggleStudyPlanStatus = async (id: number, isActive: boolean) => {
  return await prisma.studyPlan.update({
    where: { id },
    data: { isActive },
  });
};