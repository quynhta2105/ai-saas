import { PrismaClient } from "@prisma/client";

// Define PrismaClient as a global variable to ensure it persists across reloads in development
const globalForPrisma = globalThis as typeof globalThis & {
    prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
