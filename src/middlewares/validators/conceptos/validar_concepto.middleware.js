import prisma from "../../../../prismaClient.js";

const validarConcepto = async (req, res, next) => {
  try {
    const { conceptos_id } = req.body;
    const usuarios_id = req.usuario.id;
    const id = conceptos_id;
    const existeConcepto = await prisma.cuentas.findFirst({
      where: { id, usuarios_id },
    });

    if (!existeConcepto) {
      const error = new Error("No existe ese concepto");
      return res.status(403).json({ msg: error.message });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default validarConcepto;
