/*
  Warnings:

  - Added the required column `count` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Product" ADD COLUMN     "count" INTEGER NOT NULL;
