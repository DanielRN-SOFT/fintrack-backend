import prisma from "../../../../prismaClient.js";

const validarCategoria = async (req, res, next) => {
  let id = parseInt(req.params.id);
  const existeCategoria = await prisma.categorias.findUnique({
    where: { id },
  });

  if (!existeCategoria) {
    const error = new Error("Esa cuenta no existe");
    return res.status(403).json({ msg: error.message, success: false });
  }

  next();
};

export default validarCategoria;