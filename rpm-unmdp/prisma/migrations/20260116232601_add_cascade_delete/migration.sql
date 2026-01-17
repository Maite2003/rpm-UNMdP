-- DropForeignKey
ALTER TABLE "Career" DROP CONSTRAINT "Career_facultyId_fkey";

-- DropForeignKey
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_universityId_fkey";

-- DropForeignKey
ALTER TABLE "StudyPlan" DROP CONSTRAINT "StudyPlan_careerId_fkey";

-- AddForeignKey
ALTER TABLE "Faculty" ADD CONSTRAINT "Faculty_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlan" ADD CONSTRAINT "StudyPlan_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE CASCADE ON UPDATE CASCADE;
