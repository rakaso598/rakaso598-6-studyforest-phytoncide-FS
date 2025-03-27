import prisma from "./client.prisma";

async function main() {
  const habits = [];
  for (let i = 1; i <= 10; i++) {
    habits.push(
      prisma.habit.create({
        data: { title: `${i}번째 습관`, studyId: 1 },
      })
    );
  }
}

main()
  .catch((e) => console.log(e))
  .finally(() => prisma.$disconnect);
