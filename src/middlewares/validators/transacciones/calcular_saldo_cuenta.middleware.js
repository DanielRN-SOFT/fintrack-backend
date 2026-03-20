import prisma from "../../../../prismaClient.js";

const calcularSaldo = async (req, res, next) => {
  try {
    // Variables principales
    const { cuentas_id, valor, conceptos_id } = req.body;
    const usuarios_id = req.usuario.id;

    // Llamado a la base de datos
    const conceptos = await prisma.conceptos.findFirst({
      where: { id: conceptos_id, usuarios_id },
      include: {
        categorias: true,
      },
    });

    // Verificar si ingresa o sale dinero
    const resultadoSueldo =
      conceptos.categorias.tipo === "Ingreso"
        ? existeCuenta.saldo_inicial + valor
        : existeCuenta.saldo_inicial - valor;

    // Hacer la actualizacion del nuevo saldo
    await prisma.cuentas.update({
      where: { usuarios_id, cuentas_id },
      data: {
        saldo_inicial: resultadoSueldo,
      },
    });

    next();
  } catch (error) {
    console.log(error);
  }
};

export default calcularSaldo;
