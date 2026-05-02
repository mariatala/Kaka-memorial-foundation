import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/app/generated/prisma/client";
import { admin } from "better-auth/plugins";

const adapter = new PrismaNeon({ 
    connectionString: process.env.DATABASE_URL! 
  });
  
  const prisma = new PrismaClient({ adapter });
  
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
    },
    plugins: [admin()],
});