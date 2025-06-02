-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_tenderId_fkey";

-- DropForeignKey
ALTER TABLE "Tender" DROP CONSTRAINT "Tender_authorId_fkey";

-- AddForeignKey
ALTER TABLE "Tender" ADD CONSTRAINT "Tender_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_tenderId_fkey" FOREIGN KEY ("tenderId") REFERENCES "Tender"("id") ON DELETE CASCADE ON UPDATE CASCADE;
