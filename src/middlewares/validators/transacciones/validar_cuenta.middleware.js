import prisma from "../../../../prismaClient.js";

const validarCuenta = async (req, res, next) => {
  try {
    const { cuentas_id } = req.body;
    const usuarios_id = req.usuario.id;
    const existeCuenta = await prisma.cuentas.findFirst({
      where: { cuentas_id, usuarios_id },
    });

    if (!existeCuenta) {
      const error = new Error("No existe esa cuenta");
      return res.status(403).json({ msg: error.message });
    }

    if (existeCuenta.saldo_inicial < valor) {
      const error = new Error(
        "El saldo de esa cuenta es insuficiente para el valo de la transaccion",
      );
      return res.status(403).json({ msg: error.message });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default validarCuenta;
