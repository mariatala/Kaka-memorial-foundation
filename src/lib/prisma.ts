import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const g = global as unknown as { prisma?: PrismaClient };

// In development, always create a fresh client so schema changes picked up by
// `prisma generate` take effect without a full server restart.
const prisma: PrismaClient =
    process.env.NODE_ENV === "production"
        ? (g.prisma ??= new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) }))
        : new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) });

export default prisma;
