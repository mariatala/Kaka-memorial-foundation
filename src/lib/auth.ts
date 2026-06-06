import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@/app/generated/prisma/client";
import { admin } from "better-auth/plugins";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { validatePassword } from "./password-validation";

const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!
  });

  const prisma = new PrismaClient({ adapter });

/** Paths whose `password` / `newPassword` field must meet the strength policy. */
const PASSWORD_PATHS: Record<string, string> = {
    "/sign-up/email":   "password",
    "/change-password": "newPassword",
};

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 8,
    },
    plugins: [admin()],

    trustedOrigins: [
        "https://kaka-memorial-foundation.vercel.app",
        "https://kakamemorialfoundation.org",
        "http://localhost:3000",
    ],

    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            const field = PASSWORD_PATHS[ctx.path];
            if (!field) return;

            const body = ctx.body as Record<string, unknown> | undefined;
            const password = typeof body?.[field] === "string" ? (body[field] as string) : undefined;
            if (!password) return;

            const error = validatePassword(password);
            if (error) {
                throw new APIError("BAD_REQUEST", { message: error });
            }
        }),
    },
});