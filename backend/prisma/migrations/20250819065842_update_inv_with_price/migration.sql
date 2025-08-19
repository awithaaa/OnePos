/*
  Warnings:

  - Added the required column `price` to the `EmptyInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salePrice` to the `EmptyInventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salePrice` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."EmptyInventory" ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "salePrice" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Inventory" ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "salePrice" DECIMAL(10,2) NOT NULL;
