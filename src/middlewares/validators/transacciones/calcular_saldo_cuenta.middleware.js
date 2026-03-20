import prisma from "../../../../prismaClient.js";

const calcularSaldo = async (req, res) => {
  const { cuentas_id, valor, conceptos_id } = req.body;
  const usuarios_id = req.usuario.id;

  const existeCuenta = await prisma.cuentas.findFirst({
    where: { cuentas_id, usuarios_id },
  });

  const conceptos = await prisma.conceptos.findFirst({
    where: { id: conceptos_id, usuarios_id },
    include: {
      categorias: true,
    },
  });

  const resultadoSueldo =
    conceptos.categorias.tipo === "Ingreso"
      ? existeCuenta.saldo_inicial + valor
      : existeCuenta.saldo_inicial - valor;

  await prisma.cuentas.update({
    where: { usuarios_id, cuentas_id },
    data: {
      saldo_inicial: resultadoSueldo,
    },
  });
};

export default calcularSaldo;
