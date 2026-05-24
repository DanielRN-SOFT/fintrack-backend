import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/es";

export async function seedMetas(prisma: PrismaClient) {
  const usuarios = await prisma.usuarios.findMany({ select: { id: true } });

  const data = usuarios.flatMap((u) =>
    Array.from({ length: faker.number.int({ min: 1, max: 4 }) }).map(() => {
      const objetivo = parseFloat(
        faker.finance.amount({ min: 500, max: 20000, dec: 2 }),
      );
      return {
        nombre: faker.lorem.words(3),
        monto_objetivo: objetivo,
        monto_actual: parseFloat(
          faker.finance.amount({ min: 0, max: objetivo, dec: 2 }),
        ),
        fecha_limite: faker.date.future({ years: 2 }),
        usuarios_id: u.id,
      };
    }),
  );

  await prisma.metas.createMany({ data });
  console.log(`${data.length} Metas creadas`);
}
