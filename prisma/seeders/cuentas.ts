import { PrismaClient, cuentas_tipo } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/es";

const TIPOS: cuentas_tipo[] = ["Cash", "Banco", "Digital"];

export async function seedCuentas(prisma: PrismaClient) {
  const usuarios = await prisma.usuarios.findMany({ select: { id: true } });

  const data = usuarios.flatMap((u) =>
    Array.from({ length: faker.number.int({ min: 1, max: 3 }) }).map(() => ({
      nombre: faker.finance.accountName(),
      tipo: faker.helpers.arrayElement(TIPOS),
      saldo_inicial: parseFloat(
        faker.finance.amount({ min: 100, max: 50000, dec: 2 }),
      ),
      usuarios_id: u.id,
    })),
  );

  await prisma.cuentas.createMany({ data, skipDuplicates: true });
  console.log(`${data.length} Cuentas creadas`);
}
