-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PENDING', 'STUDENT', 'ADMIN');

-- CreateEnum
CREATE TYPE "DocType" AS ENUM ('DNI', 'PASSPORT');

-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('FIRST', 'SECOND', 'BOTH');

-- CreateEnum
CREATE TYPE "CommissionRole" AS ENUM ('GRADUATE_ASSISTANT', 'STUDENT_ASSISTANT', 'THEORY_PROFESSOR', 'PRACTICE_PROFESSOR');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PUBLISHED', 'PENDING', 'BANNED');

-- CreateEnum
CREATE TYPE "ReviewType" AS ENUM ('COMMISSION', 'PROFESSOR');

-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Career" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "subjectCount" INTEGER NOT NULL,
    "years" INTEGER NOT NULL,
    "facultyId" INTEGER NOT NULL,

    CONSTRAINT "Career_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPlan" (
    "id" SERIAL NOT NULL,
    "careerId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "year" INTEGER NOT NULL,

    CONSTRAINT "StudyPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "credits" INTEGER NOT NULL,
    "hours" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudyPlanSubject" (
    "planId" INTEGER NOT NULL,
    "subjectId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "semester" "Semester" NOT NULL,

    CONSTRAINT "StudyPlanSubject_pkey" PRIMARY KEY ("planId","subjectId")
);

-- CreateTable
CREATE TABLE "Correlation" (
    "predecessorId" INTEGER NOT NULL,
    "successorId" INTEGER NOT NULL,

    CONSTRAINT "Correlation_pkey" PRIMARY KEY ("predecessorId","successorId")
);

-- CreateTable
CREATE TABLE "Commission" (
    "id" SERIAL NOT NULL,
    "year" INTEGER NOT NULL,
    "schedules" TEXT,
    "semester" "Semester" NOT NULL,
    "subjectId" INTEGER NOT NULL,

    CONSTRAINT "Commission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" SERIAL NOT NULL,
    "full_name" TEXT NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommissionProfessor" (
    "commissionId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "role" "CommissionRole" NOT NULL,

    CONSTRAINT "CommissionProfessor_pkey" PRIMARY KEY ("commissionId","professorId")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "docType" "DocType" NOT NULL,
    "docNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollment" (
    "studentId" INTEGER NOT NULL,
    "careerId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileNumber" TEXT NOT NULL,

    CONSTRAINT "Enrollment_pkey" PRIMARY KEY ("studentId","careerId")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "commissionId" INTEGER NOT NULL,
    "studentId" INTEGER NOT NULL,
    "dislikeCount" INTEGER NOT NULL DEFAULT 0,
    "likeCount" INTEGER NOT NULL DEFAULT 0,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PUBLISHED',
    "content" TEXT NOT NULL,
    "type" "ReviewType" NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReviewProfessorDetail" (
    "reviewId" INTEGER NOT NULL,
    "professorId" INTEGER NOT NULL,
    "treatmentScore" INTEGER NOT NULL,
    "explanationScore" INTEGER NOT NULL,

    CONSTRAINT "ReviewProfessorDetail_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "ReviewCommissionDetail" (
    "reviewId" INTEGER NOT NULL,
    "contentScore" INTEGER NOT NULL,
    "difficultyScore" INTEGER NOT NULL,

    CONSTRAINT "ReviewCommissionDetail_pkey" PRIMARY KEY ("reviewId")
);

-- CreateTable
CREATE TABLE "Vote" (
    "studentId" INTEGER NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "isPositive" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("studentId","reviewId")
);

-- CreateTable
CREATE TABLE "ReviewAudit" (
    "id" SERIAL NOT NULL,
    "reviewId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT,
    "originalContent" TEXT,

    CONSTRAINT "ReviewAudit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_docType_docNumber_key" ON "Student"("docType", "docNumber");

-- AddForeignKey
ALTER TABLE "Career" ADD CONSTRAINT "Career_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudyPlan" ADD CONSTRAINT "StudyPlan_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "CommissionProfessor" ADD CONSTRAINT "CommissionProfessor_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollment" ADD CONSTRAINT "Enrollment_careerId_fkey" FOREIGN KEY ("careerId") REFERENCES "Career"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewProfessorDetail" ADD CONSTRAINT "ReviewProfessorDetail_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewProfessorDetail" ADD CONSTRAINT "ReviewProfessorDetail_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewCommissionDetail" ADD CONSTRAINT "ReviewCommissionDetail_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReviewAudit" ADD CONSTRAINT "ReviewAudit_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
