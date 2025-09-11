-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('laptop', 'tablet', 'mobile', 'headphone');

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "brand" TEXT NOT NULL,
    "category" "public"."Category" NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Laptop" (
    "productId" INTEGER NOT NULL,
    "ram" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "screenSize" DOUBLE PRECISION NOT NULL,
    "gpu" TEXT NOT NULL,

    CONSTRAINT "Laptop_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "public"."Tablet" (
    "productId" INTEGER NOT NULL,
    "ram" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "screenSize" DOUBLE PRECISION NOT NULL,
    "batteryLife" INTEGER NOT NULL,

    CONSTRAINT "Tablet_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "public"."Mobile" (
    "productId" INTEGER NOT NULL,
    "ram" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "screenSize" DOUBLE PRECISION NOT NULL,
    "cameraMegapixels" INTEGER NOT NULL,
    "batteryCapacity" INTEGER NOT NULL,

    CONSTRAINT "Mobile_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "public"."Headphone" (
    "productId" INTEGER NOT NULL,
    "connectionType" TEXT NOT NULL,
    "noiseCancelling" BOOLEAN NOT NULL,
    "batteryLife" INTEGER,

    CONSTRAINT "Headphone_pkey" PRIMARY KEY ("productId")
);

-- AddForeignKey
ALTER TABLE "public"."Laptop" ADD CONSTRAINT "Laptop_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tablet" ADD CONSTRAINT "Tablet_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Mobile" ADD CONSTRAINT "Mobile_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Headphone" ADD CONSTRAINT "Headphone_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
