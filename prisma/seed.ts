import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { v4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "super@workeasy.com",
      id: v4(),
      password: await hash(process.env.PASSWORD, 10),
      admin: true,
      support: true,
      moderator: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
