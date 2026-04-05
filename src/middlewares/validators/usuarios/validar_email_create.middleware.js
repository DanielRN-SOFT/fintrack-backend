import prisma from "../../../../prismaClient.js";

const validarEmail = async (req, res, next) => {
  try {
    // Destructuring de email
    const { email } = req.body;
    // Buscar el email que digito el usuario
    const emailExiste = await prisma.usuarios.findUnique({
      where: {
        email,
      },
    });

    if (emailExiste) {
      const error = new Error("Ese email ya esta registrado");
      return res.status(400).json({ msg: error.message, success: false });
    }

    // Si no existe el email continue al controlador
    next();
  } catch (error) {
    console.log(error);
  }
};

export default validarEmail;
