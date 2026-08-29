import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient | null {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn("DATABASE_URL not set. Running in demo mode without database.");
      return null;
    }
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    });
  } catch (e) {
    console.warn("Failed to create PrismaClient. Running in demo mode without database.");
    return null;
  }
}

export const prisma: PrismaClient | null =
  (global.prisma as PrismaClient | undefined) || createPrismaClient();

if (process.env.NODE_ENV !== "production" && prisma) {
  global.prisma = prisma;
}
