import { PrismaClient } from "@prisma/client";
import { hash, hashSync } from "bcryptjs";
import { v4 } from "uuid";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "super@workeasy.com",
      name: "workeasysuper",
      id: v4(),
      password: hashSync(process.env.PASSWORD, 10),
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
