-- AlterTable: enforce unique phone numbers across all registrations
CREATE UNIQUE INDEX "Registration_phone_key" ON "Registration"("phone");
