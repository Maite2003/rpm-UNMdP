import { prisma } from "@/lib/prisma";
import { DocType, Prisma, StudentStatus } from "@/generated/prisma/client";
import { email } from "zod";

/**
 * Retrieves a user by their email address.
 */
export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { 
      email,
      isDeleted: false,
    },
  });
};

/**
 * Retrieves a user by their ID.
 * Includes their active careers.
 */
export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      enrollments: {
        include: { career: true },
      },
      _count: {
        select: {
          reviews: true,
          votes: true
        }
      }
    },
  });
};

/**
 * Retrieves all users for the Admin Dashboard.
 * Includes counters for reviews and votes to identify active contributors.
 */
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: { lastName: 'asc' },
    include: {
      _count: {
        select: { reviews: true }
      }
    }
  });
};

/**
 * Creates a new user (Registration).
 */
export const createUser = async (data: Prisma.UserCreateInput) => {
  return await prisma.user.create({
    data,
  });
};

/**
 * Updates user profile information (Name, Student Status, etc.).
 */
export const updateUser = async (id: number, data: Prisma.UserUpdateInput) => {
  return await prisma.user.update({
    where: { id },
    data,
  });
};

/**
 * Updates the Student Status specifically.
 */
export const updateUserStatus = async (id: number, status: StudentStatus) => {
  return await prisma.user.update({
    where: { id },
    data: { studentStatus: status },
  });
};

/**
 * Toggles the Admin status of a user.
 */
export const toggleUserAdmin = async (id: number, isAdmin: boolean) => {
  return await prisma.user.update({
    where: { id },
    data: { isAdmin },
  });
};

/**
 * Performs a Soft Delete.
 * The user remains in the DB(preserving their reviews / votes), 
 * but cannot login anymore.
 */
export const deleteUser = async (id: number) => {
  return await prisma.user.update({
    where: { id },
    data: {
      isDeleted: true
    },
  });
};

/**
 * Hard Deletes a user.
 */
export const hardDeleteUser = async (id: number) => {
  return await prisma.user.delete({
    where: { id },
  });
};

/**
 * Allows an Admin to restore a deleted user.
 */
export const restoreUser = async (id: number) => {
  return await prisma.user.update({
    where: { id },
    data: {
      isDeleted: false
    },
  });
};

/**
 * Enrolls a student in a specific career.
 */
export const enrollUserInCareer = async (studentId: number, careerId: number, fileNumber: string) => {
  return await prisma.enrollment.create({
    data: {
      studentId,
      careerId,
      fileNumber,
    },
  });
};

/**
 * Checks for duplicates.
 * Returns null if safe to register.
 * Returns 'EMAIL_EXISTS' or 'DOCUMENT_EXISTS' if there is a conflict.
 */
export const validateNewUserInfo = async (email: string, docType: DocType, docNumber: string) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { email: email },
        {
          AND: [
            { docType: docType },
            { docNumber: docNumber }
          ]
        }
      ]
    },
    select: {
      id: true,
      email: true,
      docType: true,
      docNumber: true,
      isDeleted: true
    }
  });

  if (!existingUser) return null;

  if (existingUser.email === email) {
    return { error: 'EMAIL_EXISTS', isDeleted: existingUser.isDeleted };
  }

  return { error: 'DOCUMENT_EXISTS', isDeleted: existingUser.isDeleted };
}