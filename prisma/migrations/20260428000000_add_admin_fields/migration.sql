-- AlterTable: add admin plugin fields to user
ALTER TABLE "user" ADD COLUMN "role" TEXT;
ALTER TABLE "user" ADD COLUMN "banned" BOOLEAN DEFAULT false;
ALTER TABLE "user" ADD COLUMN "banReason" TEXT;
ALTER TABLE "user" ADD COLUMN "banExpires" TIMESTAMP(3);

-- AlterTable: add impersonation tracking to session
ALTER TABLE "session" ADD COLUMN "impersonatedBy" TEXT;
