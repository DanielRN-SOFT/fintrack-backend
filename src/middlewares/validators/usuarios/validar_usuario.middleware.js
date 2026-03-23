import prisma from "../../../../prismaClient.js";

const validarUsuario = async (req, res, next) => {
  try {
    // Variables principales
    const id = parseInt(req.params.id);

    // Llamado a la base de datos
    const usuario = await prisma.usuarios.findUnique({ where: { id } });

    // Validar que exista dicho usuario
    if (!usuario) {
      const error = new Error("El usuario no existe");
      return res.status(400).json({ msg: error.message, success: false });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default validarUsuario;
