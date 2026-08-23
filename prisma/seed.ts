import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@delegatex.org";
  const rawPassword = "Secretariat2026!";
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

  const delegateEmail = "delegate@mun.org";
  const delegatePasswordHash = await bcrypt.hash("Delegate2026!", 10);

  await prisma.user.upsert({
    where: { email: delegateEmail },
    update: {},
    create: {
      name: "Vivaan Chawla",
      email: delegateEmail,
      passwordHash: delegatePasswordHash,
      role: "DELEGATE",
    },
  });

  console.log("Master Admin and delegate users seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
