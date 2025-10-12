import { PrismaClient } from "@prisma/client";

// creating global space for storing prisma instances safely during reloads in development mode

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });

//reload doesn't happen in production mode so store prisma instance to global for development only
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
