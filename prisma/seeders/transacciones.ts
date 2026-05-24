import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/es";

export async function seedTransacciones(
  prisma: PrismaClient,
  countPerUser = 50,
) {
  const usuarios = await prisma.usuarios.findMany({ select: { id: true } });

  // Cargar cuentas y conceptos (con tipo de categoría) por usuario
  const [cuentas, conceptos] = await Promise.all([
    prisma.cuentas.findMany({ select: { id: true, usuarios_id: true } }),
    prisma.conceptos.findMany({
      select: {
        id: true,
        usuarios_id: true,
        categorias: { select: { tipo: true } },
      },
    }),
  ]);

  const cuentasPorUsuario = new Map<number, number[]>();
  const ingresosPorUsuario = new Map<number, number[]>();
  const egresosPorUsuario = new Map<number, number[]>();

  cuentas.forEach((c) => {
    if (!cuentasPorUsuario.has(c.usuarios_id))
      cuentasPorUsuario.set(c.usuarios_id, []);
    cuentasPorUsuario.get(c.usuarios_id)!.push(c.id);
  });

  conceptos.forEach((c) => {
    const esIngreso = c.categorias.tipo === "Ingreso";
    const map = esIngreso ? ingresosPorUsuario : egresosPorUsuario;

    if (!map.has(c.usuarios_id)) map.set(c.usuarios_id, []);
    map.get(c.usuarios_id)!.push(c.id);
  });

  const BATCH_SIZE = 500;
  let total = 0;

  for (const usuario of usuarios) {
    const userCuentas = cuentasPorUsuario.get(usuario.id) ?? [];
    const userIngresos = ingresosPorUsuario.get(usuario.id) ?? [];
    const userEgresos = egresosPorUsuario.get(usuario.id) ?? [];

    if (!userCuentas.length || (!userIngresos.length && !userEgresos.length))
      continue;

    const data = Array.from({ length: countPerUser }).map(() => {
      // 65% probabilidad de ingreso
      const esIngreso =
        userIngresos.length > 0 &&
        (userEgresos.length === 0 || faker.number.float() < 0.65);

      const conceptos_id = esIngreso
        ? faker.helpers.arrayElement(userIngresos)
        : faker.helpers.arrayElement(userEgresos);

      // Ingresos con montos más altos que egresos
      const valor = esIngreso
        ? parseFloat(faker.finance.amount({ min: 500, max: 8000, dec: 2 }))
        : parseFloat(faker.finance.amount({ min: 10, max: 1500, dec: 2 }));

      return {
        fecha: faker.date.past({ years: 1 }),
        valor,
        descripcion: faker.lorem.sentence(),
        estado: faker.helpers.weightedArrayElement([
          { value: "Activa" as const, weight: 90 },
          { value: "Anulada" as const, weight: 10 },
        ]),
        usuarios_id: usuario.id,
        cuentas_id: faker.helpers.arrayElement(userCuentas),
        conceptos_id,
      };
    });

    for (let i = 0; i < data.length; i += BATCH_SIZE) {
      await prisma.transacciones.createMany({
        data: data.slice(i, i + BATCH_SIZE),
      });
    }

    total += data.length;
  }

  console.log(`✅ ${total} Transacciones creadas`);
}
