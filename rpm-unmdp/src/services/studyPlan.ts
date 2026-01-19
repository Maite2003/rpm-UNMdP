import { prisma } from "@/lib/prisma";
import { Prisma, Semester } from "@/generated/prisma/client";
import { StudyPlanUncheckedUpdateInput } from "@/generated/prisma/models";

/**
 * Retrieves a Study Plan by ID with full structure.
 */
export const getStudyPlanById = async (id: string) => {
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
 * @param data - { careerId, year, totalYears, subjectCount }
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
  planId: string,
  subjectId: string,
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
export const removeSubjectFromPlan = async (planId: string, subjectId: string) => {
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
export const toggleStudyPlanStatus = async (id: string, isActive: boolean) => {
  return await prisma.studyPlan.update({
    where: { id },
    data: { isActive },
  });
};

export const updateStudyPlan = async (id: string, data: StudyPlanUncheckedUpdateInput) => {
  return await prisma.studyPlan.update({
    where: { id },
    data
  });
}


export const deleteStudyPlan = async (id: string) => {
  return await prisma.studyPlan.delete({
    where: { id }
  });
}