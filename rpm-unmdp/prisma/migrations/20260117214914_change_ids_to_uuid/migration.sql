/*
  Warnings:

  - The primary key for the `Career` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Commission` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `CommissionProfessor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Correlation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Enrollment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Faculty` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Professor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ReviewAudit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ReviewCommissionDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ReviewProfessorDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StudyPlan` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `StudyPlanSubject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `University` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Career" DROP CONSTRAINT "Career_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Commission" DROP CONSTRAINT "Commission_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "CommissionProfessor" DROP CONSTRAINT "CommissionProfessor_commissionId_fkey";

-- DropForeignKey
ALTER TABLE "CommissionProfessor" DROP CONSTRAINT "CommissionProfessor_professorId_fkey";

-- DropForeignKey
ALTER TABLE "Correlation" DROP CONSTRAINT "Correlation_predecessorId_fkey";

-- DropForeignKey
ALTER TABLE "Correlation" DROP CONSTRAINT "Correlation_successorId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_careerId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_universityId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_commissionId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_reporterId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_studentId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewAudit" DROP CONSTRAINT "ReviewAudit_reporterId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewAudit" DROP CONSTRAINT "ReviewAudit_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewCommissionDetail" DROP CONSTRAINT "ReviewCommissionDetail_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewProfessorDetail" DROP CONSTRAINT "ReviewProfessorDetail_professorId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewProfessorDetail" DROP CONSTRAINT "ReviewProfessorDetail_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "StudyPlan" DROP CONSTRAINT "StudyPlan_careerId_fkey";

-- DropForeignKey
ALTER TABLE "StudyPlanSubject" DROP CONSTRAINT "StudyPlanSubject_planId_fkey";

-- DropForeignKey
ALTER TABLE "StudyPlanSubject" DROP CONSTRAINT "StudyPlanSubject_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_studentId_fkey";

-- AlterTable
ALTER TABLE "Career" DROP CONSTRAINT "Career_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "facultyId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Career_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Career_id_seq";

-- AlterTable
ALTER TABLE "Commission" DROP CONSTRAINT "Commission_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "subjectId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Commission_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Commission_id_seq";

-- AlterTable
ALTER TABLE "CommissionProfessor" DROP CONSTRAINT "CommissionProfessor_pkey",
ALTER COLUMN "commissionId" SET DATA TYPE TEXT,
ALTER COLUMN "professorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "CommissionProfessor_pkey" PRIMARY KEY ("commissionId", "professorId");

-- AlterTable
ALTER TABLE "Correlation" DROP CONSTRAINT "Correlation_pkey",
ALTER COLUMN "predecessorId" SET DATA TYPE TEXT,
ALTER COLUMN "successorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Correlation_pkey" PRIMARY KEY ("predecessorId", "successorId");

-- AlterTable
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_pkey",
ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ALTER COLUMN "careerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("studentId", "careerId");

-- AlterTable
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "universityId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Faculty_id_seq";

-- AlterTable
ALTER TABLE "Professor" DROP CONSTRAINT "Professor_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Professor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Professor_id_seq";

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "commissionId" SET DATA TYPE TEXT,
ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ALTER COLUMN "reporterId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Review_id_seq";

-- AlterTable
ALTER TABLE "ReviewAudit" DROP CONSTRAINT "ReviewAudit_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "reviewId" SET DATA TYPE TEXT,
ALTER COLUMN "reporterId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ReviewAudit_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ReviewAudit_id_seq";

-- AlterTable
ALTER TABLE "ReviewCommissionDetail" DROP CONSTRAINT "ReviewCommissionDetail_pkey",
ALTER COLUMN "reviewId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ReviewCommissionDetail_pkey" PRIMARY KEY ("reviewId");

-- AlterTable
ALTER TABLE "ReviewProfessorDetail" DROP CONSTRAINT "ReviewProfessorDetail_pkey",
ALTER COLUMN "reviewId" SET DATA TYPE TEXT,
ALTER COLUMN "professorId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ReviewProfessorDetail_pkey" PRIMARY KEY ("reviewId");

-- AlterTable
ALTER TABLE "StudyPlan" DROP CONSTRAINT "StudyPlan_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "careerId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StudyPlan_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "StudyPlan_id_seq";

-- AlterTable
ALTER TABLE "StudyPlanSubject" DROP CONSTRAINT "StudyPlanSubject_pkey",
ALTER COLUMN "planId" SET DATA TYPE TEXT,
ALTER COLUMN "subjectId" SET DATA TYPE TEXT,
ADD CONSTRAINT "StudyPlanSubject_pkey" PRIMARY KEY ("planId", "subjectId");

-- AlterTable
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Subject_id_seq";

-- AlterTable
ALTER TABLE "University" DROP CONSTRAINT "University_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "University_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "University_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_pkey",
ALTER COLUMN "studentId" SET DATA TYPE TEXT,
ALTER COLUMN "reviewId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vote_pkey" PRIMARY KEY ("studentId", "reviewId");

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlan" ADD CONSTRAINT "StudyPlan_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanSubject" ADD CONSTRAINT "StudyPlanSubject_planId_fkey" FOREIGN KEY ("planId") REFERENCES "StudyPlan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanSubject" ADD CONSTRAINT "StudyPlanSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correlation" ADD CONSTRAINT "Correlation_predecessorId_fkey" FOREIGN KEY ("predecessorId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correlation" ADD CONSTRAINT "Correlation_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionProfessor" ADD CONSTRAINT "CommissionProfessor_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionProfessor" ADD CONSTRAINT "CommissionProfessor_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewProfessorDetail" ADD CONSTRAINT "ReviewProfessorDetail_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewProfessorDetail" ADD CONSTRAINT "ReviewProfessorDetail_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewCommissionDetail" ADD CONSTRAINT "ReviewCommissionDetail_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewAudit" ADD CONSTRAINT "ReviewAudit_reporterId_fkey" FOREIGN KEY ("reporterId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewAudit" ADD CONSTRAINT "ReviewAudit_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
