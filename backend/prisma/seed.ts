import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.post.count();
  if (count > 0) return;

  await prisma.post.create({
    data: {
      title: "Welcome to the Blog",
      body: "This is the first post, seeded for local development.",
      tags: ["welcome", "intro"],
      comments: {
        create: [
          { body: "Great first post!", authorName: "Jane" },
          { body: "Looking forward to more.", authorName: "John" },
        ],
      },
    },
  });
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
