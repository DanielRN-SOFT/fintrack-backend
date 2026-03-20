import prisma from "../../../../prismaClient.js";

const validarConcepto = async (req, res, next) => {
  try {
    // Variables principales
    const { conceptos_id } = req.body;
    const usuarios_id = req.usuario.id;
    const id = conceptos_id;

    // Llamado a la base de datos
    const existeConcepto = await prisma.conceptos.findFirst({
      where: { id, usuarios_id },
    });

    // Verificar que el concepto enviado si exista
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
