/*
  Warnings:

  - You are about to drop the column `attachment_url` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `num_upvotes` on the `Review` table. All the data in the column will be lost.
  - Added the required column `productId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" DROP COLUMN "attachment_url",
DROP COLUMN "num_upvotes",
ADD COLUMN     "attachmentUrl" TEXT,
ADD COLUMN     "numUpvotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "productId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
