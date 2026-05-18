import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("admin123", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@artvault.com" },
    update: {},
    create: { email: "admin@artvault.com", password, name: "Admin" },
  });
  console.log("✅ Admin user ready:", user.email, "/ password: admin123");
}

main().catch(console.error).finally(() => prisma.$disconnect());
