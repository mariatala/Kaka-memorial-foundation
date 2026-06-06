-- AlterTable
ALTER TABLE "Event" ADD COLUMN "eventCategoryId" INTEGER;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eventCategoryId_fkey"
    FOREIGN KEY ("eventCategoryId") REFERENCES "EventCategory"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateIndex
-- PostgreSQL treats NULLs as distinct in unique indexes, so existing rows
-- with eventCategoryId IS NULL will never conflict with each other.
CREATE UNIQUE INDEX "Event_eventCategoryId_email_key"
    ON "Event"("eventCategoryId", "email");
