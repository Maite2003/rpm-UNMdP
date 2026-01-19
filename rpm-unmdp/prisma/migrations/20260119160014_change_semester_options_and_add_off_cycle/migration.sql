/*
  Warnings:

  - The values [BOTH] on the enum `Semester` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Semester_new" AS ENUM ('FIRST', 'SECOND', 'ANNUAL');
ALTER TABLE "StudyPlanSubject" ALTER COLUMN "semester" TYPE "Semester_new" USING ("semester"::text::"Semester_new");
ALTER TABLE "Commission" ALTER COLUMN "semester" TYPE "Semester_new" USING ("semester"::text::"Semester_new");
ALTER TYPE "Semester" RENAME TO "Semester_old";
ALTER TYPE "Semester_new" RENAME TO "Semester";
DROP TYPE "public"."Semester_old";
COMMIT;

-- AlterTable
ALTER TABLE "StudyPlanSubject" ADD COLUMN     "offCycleOption" BOOLEAN NOT NULL DEFAULT false;
