import prisma from "../../../../prismaClient.js";

const calcularSaldo = async (req, res, next) => {
  try {
    // Variables principales
    const { cuentas_id, valor, conceptos_id } = req.body;
    const usuarios_id = req.usuario.id;

    // Llamado a la base de datos conceptos
    const conceptos = await prisma.conceptos.findFirst({
      where: { id: conceptos_id, usuarios_id },
      include: {
        categorias: true,
      },
    });

    // Obtener la cuenta
    const existeCuenta = await prisma.cuentas.findFirst({
      where: { id: cuentas_id, usuarios_id },
    });

    const saldo_inicial = parseInt(existeCuenta.saldo_inicial);
    const valorTransaccion = parseInt(valor);

    // Verificar si ingresa o sale dinero
    const resultadoSaldo =
      conceptos.categorias.tipo === "Ingreso"
        ? saldo_inicial + valorTransaccion
        : saldo_inicial - valorTransaccion;

   

    // Hacer la actualizacion del nuevo saldo
    await prisma.cuentas.update({
      where: { usuarios_id, id: cuentas_id },
      data: {
        saldo_inicial: resultadoSaldo,
      },
    });

    next();
  } catch (error) {
    console.log(error);
  }
};

export default calcularSaldo;
