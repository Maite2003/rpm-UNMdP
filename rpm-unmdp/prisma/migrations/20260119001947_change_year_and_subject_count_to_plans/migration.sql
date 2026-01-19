/*
  Warnings:

  - You are about to drop the column `subjectCount` on the `Career` table. All the data in the column will be lost.
  - You are about to drop the column `years` on the `Career` table. All the data in the column will be lost.
  - Added the required column `subjectCount` to the `StudyPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_years` to the `StudyPlan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Commission" DROP CONSTRAINT "Commission_subjectId_fkey";

-- DropForeignKey
ALTER TABLE "CommissionProfessor" DROP CONSTRAINT "CommissionProfessor_commissionId_fkey";

-- DropForeignKey
ALTER TABLE "Correlation" DROP CONSTRAINT "Correlation_predecessorId_fkey";

-- DropForeignKey
ALTER TABLE "Correlation" DROP CONSTRAINT "Correlation_successorId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_careerId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewAudit" DROP CONSTRAINT "ReviewAudit_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "StudyPlanSubject" DROP CONSTRAINT "StudyPlanSubject_planId_fkey";

-- DropForeignKey
ALTER TABLE "StudyPlanSubject" DROP CONSTRAINT "StudyPlanSubject_subjectId_fkey";

-- AlterTable
ALTER TABLE "Career" DROP COLUMN "subjectCount",
DROP COLUMN "years";

-- AlterTable
ALTER TABLE "StudyPlan" ADD COLUMN     "subjectCount" INTEGER NOT NULL,
ADD COLUMN     "total_years" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "StudyPlanSubject" ADD CONSTRAINT "StudyPlanSubject_planId_fkey" FOREIGN KEY ("planId") REFERENCES "StudyPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlanSubject" ADD CONSTRAINT "StudyPlanSubject_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correlation" ADD CONSTRAINT "Correlation_predecessorId_fkey" FOREIGN KEY ("predecessorId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Correlation" ADD CONSTRAINT "Correlation_successorId_fkey" FOREIGN KEY ("successorId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Commission" ADD CONSTRAINT "Commission_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommissionProfessor" ADD CONSTRAINT "CommissionProfessor_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewAudit" ADD CONSTRAINT "ReviewAudit_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
