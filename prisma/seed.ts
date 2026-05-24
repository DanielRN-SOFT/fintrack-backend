import { PrismaClient } from "@prisma/client";
import { seedRoles } from "./seeders/roles";
import { seedUsuarios } from "./seeders/usuarios";
import { seedCuentas } from "./seeders/cuentas";
import { seedCategorias } from "./seeders/categorias";
import { seedConceptos } from "./seeders/conceptos";
import { seedMetas } from "./seeders/metas";
import { seedTransacciones } from "./seeders/transacciones";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando seed...\n");

  await seedRoles(prisma);
  await seedUsuarios(prisma, 20); // 20 usuarios
  await seedCuentas(prisma);
  await seedCategorias(prisma);
  await seedConceptos(prisma);
  await seedMetas(prisma);
  await seedTransacciones(prisma, 100); // 100 transacciones por usuario

  console.log("\n🎉 Seed completado!");
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
