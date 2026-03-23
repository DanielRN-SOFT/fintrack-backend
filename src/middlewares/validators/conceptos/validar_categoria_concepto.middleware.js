import prisma from "../../../../prismaClient.js";

const validarConcepto = async (req, res, next) => {
  try {
    // Variables principales
    const usuarios_id = req.usuario.id;
    const { categorias_id } = req.body;
    const id = categorias_id;

    // Llamado a la base de datos
    const exiteConcepto = await prisma.categorias.findFirst({
      where: { usuarios_id, id },
    });

    
    // Verificar que exista dicha categoria enviada
    if (!exiteConcepto) {
      const error = new Error(
        "Esa categoria no existe o no tienes permiso para utilizarla",
      );
      return res.status(403).json({ msg: error.message, success: false });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default validarConcepto;
