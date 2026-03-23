import prisma from "../../../../prismaClient.js";

const reponerSaldo = async (req, res, next) => {
  // Obtener la transaccion a actualizar
  const idTransaccion = parseInt(req.params.id);

  // Obtener la transaccion con todos los JOINS
  const transaccion = await prisma.transacciones.findFirst({
    where: { id: idTransaccion },
    include: {
      cuentas: true,
      conceptos: {
        include: {
          categorias: true,
        },
      },
    },
  });

  // Determinar las variables a utilizar
  const saldo_inicial = parseInt(transaccion.cuentas.saldo_inicial);
  const tipoTransaccion = transaccion.conceptos.categorias.tipo;
  const idCuenta = transaccion.cuentas.id;
  const valorTransaccion = parseInt(transaccion.valor);

  let reponerSaldo = 0;

  // Verificar que sea activar
  const ruta = req.path.split("/");

  // Calcular el saldo a reponer
  reponerSaldo =
    tipoTransaccion === "Ingreso"
      ? saldo_inicial - valorTransaccion
      : saldo_inicial + valorTransaccion;

  if (ruta[2] === "activar") {
    reponerSaldo = 0;
    reponerSaldo =
      tipoTransaccion === "Ingreso"
        ? saldo_inicial + valorTransaccion
        : saldo_inicial - valorTransaccion;
  }


  await prisma.cuentas.update({
    where: { id: idCuenta },
    data: {
      saldo_inicial: reponerSaldo,
    },
  });

  next();
};

export default reponerSaldo;
