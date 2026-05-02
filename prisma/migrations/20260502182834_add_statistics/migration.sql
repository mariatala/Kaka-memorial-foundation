-- AlterTable
ALTER TABLE "EventCategory" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Statistic" (
    "id" SERIAL NOT NULL,
    "prefix" TEXT NOT NULL DEFAULT '',
    "value" TEXT NOT NULL,
    "suffix" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Statistic_pkey" PRIMARY KEY ("id")
);
