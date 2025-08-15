/*
  Warnings:

  - A unique constraint covering the columns `[suk]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Item" ADD COLUMN     "discount" DECIMAL(10,2),
ADD COLUMN     "suk" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Item_suk_key" ON "public"."Item"("suk");
