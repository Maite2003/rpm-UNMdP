/*
  Warnings:

  - You are about to drop the column `total_years` on the `StudyPlan` table. All the data in the column will be lost.
  - Added the required column `totalYears` to the `StudyPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "StudyPlan" DROP COLUMN "total_years",
ADD COLUMN     "totalYears" INTEGER NOT NULL;
