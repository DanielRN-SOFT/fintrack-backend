import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/es";

export async function seedConceptos(prisma: PrismaClient) {
  const categorias = await prisma.categorias.findMany({
    select: { id: true, usuarios_id: true },
  });

  const data = categorias.flatMap((cat) =>
    Array.from({ length: faker.number.int({ min: 2, max: 5 }) }).map(() => ({
      nombre: faker.commerce.productName(),
      categorias_id: cat.id,
      usuarios_id: cat.usuarios_id,
    })),
  );

  await prisma.conceptos.createMany({ data, skipDuplicates: true });
  console.log(`${data.length} Conceptos creados`);
}
