import prisma from "../../../../prismaClient.js";

const validarEmail = async (req, res, next) => {
  try {
    // Destructuring de email
    const { email } = req.body;
    let { id } = req.params;
    id = parseInt(id);

    // Comparar con el email actual
    if (req.usuario.email !== email) {
      const existeEmail = await prisma.usuarios.findUnique({
        where: { email },
      });

      if (existeEmail) {
        const error = new Error("Ese email ya esta registrado");
        return res.status(400).json({ msg: error.message });
      }
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default validarEmail;
