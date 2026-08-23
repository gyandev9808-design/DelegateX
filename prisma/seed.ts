import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@delegatex.org";
  const rawPassword = "VivaanCedar";
  const passwordHash = await bcrypt.hash(rawPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: "Secretariat Master Admin",
      email: adminEmail,
      passwordHash,
      role: "MASTER_ADMIN",
    },
  });

  console.log("Master Admin user seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
