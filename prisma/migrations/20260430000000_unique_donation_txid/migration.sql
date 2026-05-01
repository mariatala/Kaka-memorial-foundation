-- AlterTable: enforce unique transaction IDs to prevent duplicate donation records
CREATE UNIQUE INDEX "Donation_transactionId_key" ON "Donation"("transactionId");
