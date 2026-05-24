import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker/locale/es";
import bcrypt from "bcryptjs";

export async function seedUsuarios(prisma: PrismaClient, count = 20) {
  const passwordHash = await bcrypt.hash("password123", 10);

  const data = Array.from({ length: count }).map((_, i) => ({
    nombre: faker.person.fullName(),
    email: faker.internet.email(),
    password: passwordHash,
    telefono: faker.phone.number(),
    token: null,
    confirmado: true,
    estado: "Activo" as const,
    roles_id: i === 0 ? 1 : 2, // El primero es Admin
  }));

  await prisma.usuarios.createMany({ data, skipDuplicates: true });
  console.log(`${count} Usuarios creados`);
}
