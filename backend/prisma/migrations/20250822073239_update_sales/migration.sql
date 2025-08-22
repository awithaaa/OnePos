/*
  Warnings:

  - Added the required column `discount` to the `SaleItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."SaleItem" DROP CONSTRAINT "SaleItem_saleId_fkey";

-- AlterTable
ALTER TABLE "public"."Sale" ADD COLUMN     "customer" TEXT;

-- AlterTable
ALTER TABLE "public"."SaleItem" ADD COLUMN     "discount" DECIMAL(10,2) NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."SaleItem" ADD CONSTRAINT "SaleItem_saleId_fkey" FOREIGN KEY ("saleId") REFERENCES "public"."Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;
