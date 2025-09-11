/*
  Warnings:

  - You are about to drop the column `cameraMegapixels` on the `Mobile` table. All the data in the column will be lost.
  - Made the column `batteryLife` on table `Headphone` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `ram` on the `Laptop` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `storage` on the `Laptop` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `camera` to the `Mobile` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `ram` on the `Mobile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `storage` on the `Mobile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `ram` on the `Tablet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `storage` on the `Tablet` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Headphone" ALTER COLUMN "batteryLife" SET NOT NULL,
ALTER COLUMN "batteryLife" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "public"."Laptop" DROP COLUMN "ram",
ADD COLUMN     "ram" INTEGER NOT NULL,
DROP COLUMN "storage",
ADD COLUMN     "storage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Mobile" DROP COLUMN "cameraMegapixels",
ADD COLUMN     "camera" INTEGER NOT NULL,
DROP COLUMN "ram",
ADD COLUMN     "ram" INTEGER NOT NULL,
DROP COLUMN "storage",
ADD COLUMN     "storage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Tablet" DROP COLUMN "ram",
ADD COLUMN     "ram" INTEGER NOT NULL,
DROP COLUMN "storage",
ADD COLUMN     "storage" INTEGER NOT NULL,
ALTER COLUMN "batteryLife" SET DATA TYPE DOUBLE PRECISION;
