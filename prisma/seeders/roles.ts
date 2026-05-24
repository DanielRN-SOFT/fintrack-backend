import { PrismaClient } from "@prisma/client";

export async function seedRoles(prisma: PrismaClient) {
  await prisma.roles.createMany({
    data: [
      { id: 1, nombre: "Administrador" },
      { id: 2, nombre: "Usuario" },
    ],
    skipDuplicates: true,
  });
  console.log("Roles creados");
}
