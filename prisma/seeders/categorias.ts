import { PrismaClient, categorias_tipo } from "@prisma/client";

const CATEGORIAS = [
  { nombre: "Alimentación", tipo: "Egreso" },
  { nombre: "Transporte", tipo: "Egreso" },
  { nombre: "Salud", tipo: "Egreso" },
  { nombre: "Entretenimiento", tipo: "Egreso" },
  { nombre: "Educación", tipo: "Egreso" },
  { nombre: "Salario", tipo: "Ingreso" },
  { nombre: "Freelance", tipo: "Ingreso" },
  { nombre: "Inversiones", tipo: "Ingreso" },
  { nombre: "Arriendo", tipo: "Ingreso" },
];

export async function seedCategorias(prisma: PrismaClient) {
  const usuarios = await prisma.usuarios.findMany({ select: { id: true } });

  const data = usuarios.flatMap((u) =>
    CATEGORIAS.map((c) => ({
      nombre: c.nombre,
      tipo: c.tipo as categorias_tipo,
      usuarios_id: u.id,
    })),
  );

  await prisma.categorias.createMany({ data, skipDuplicates: true });
  console.log(`${data.length} Categorías creadas`);
}
