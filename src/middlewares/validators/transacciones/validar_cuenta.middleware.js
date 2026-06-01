import prisma from "../../../../prismaClient.js";

const validarCuenta = async (req, res, next) => {
  try {
    // Variables principales
    const { cuentas_id, valor, conceptos_id } = req.body;
    const usuarios_id = req.usuario.id;

    // Llamado a la base de datos
    const existeCuenta = await prisma.cuentas.findFirst({
      where: { id: cuentas_id, usuarios_id },
    });

    // Verificar el tipo de transaccion
    const tipoTransaccion = await prisma.conceptos.findFirst({
      where: { id: conceptos_id },
      include: {
        categorias: true,
      },
    });

    // Comprobar si esa cuenta existe y esta asociada a dicho usuario
    if (!existeCuenta) {
      const error = new Error("No existe esa cuenta");
      return res.status(403).json({ msg: error.message, success: false });
    }

    // Verif  icar que el saldo sea suficiente para la transaccion si es un egreso
    if (
      existeCuenta.saldo_inicial < valor &&
      tipoTransaccion.categorias.tipo === "Egreso"
    ) {
      const error = new Error(
        "El saldo de esa cuenta es insuficiente para el valor de la transaccion",
      );
      return res.status(403).json({ msg: error.message, success: false });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default validarCuenta;
