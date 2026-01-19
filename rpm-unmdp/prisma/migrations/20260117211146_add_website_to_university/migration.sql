-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_commissionId_fkey";

-- AlterTable
ALTER TABLE "University" ADD COLUMN     "website" TEXT;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_commissionId_fkey" FOREIGN KEY ("commissionId") REFERENCES "Commission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
