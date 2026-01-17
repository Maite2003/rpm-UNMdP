-- DropForeignKey
ALTER TABLE "CommissionProfessor" DROP CONSTRAINT "CommissionProfessor_professorId_fkey";

-- DropForeignKey
ALTER TABLE "ReviewProfessorDetail" DROP CONSTRAINT "ReviewProfessorDetail_professorId_fkey";

-- AddForeignKey
ALTER TABLE "CommissionProfessor" ADD CONSTRAINT "CommissionProfessor_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewProfessorDetail" ADD CONSTRAINT "ReviewProfessorDetail_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
