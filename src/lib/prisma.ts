import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const g = global as unknown as { prisma?: PrismaClient };

// pg v9 will break 'require'/'prefer'/'verify-ca' — normalise to 'verify-full'
// (same actual behaviour, no deprecation warning)
function dbUrl() {
    return (process.env.DATABASE_URL ?? '').replace(
        /sslmode=(prefer|require|verify-ca)/,
        'sslmode=verify-full',
    );
}

const prisma: PrismaClient =
    process.env.NODE_ENV === "production"
        ? (g.prisma ??= new PrismaClient({ adapter: new PrismaPg({ connectionString: dbUrl() }) }))
        : new PrismaClient({ adapter: new PrismaPg({ connectionString: dbUrl() }) });

export default prisma;
