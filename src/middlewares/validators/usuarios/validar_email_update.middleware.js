import prisma from "../../../../prismaClient.js";

const validarEmail = async (req, res, next) => {
  try {
    // Destructuring de email
    const { email } = req.body;
    let { id } = req.params;
    id = parseInt(id);

    // Encontrar el email actual
    const usuario = await prisma.usuarios.findUnique({ where: { email, id } });

    // Si no existe
    if (usuario) {
      // Validar que el email ingresado sea diferente al actual
      if (!usuario.email == email) {
        metodoValidacion(email, res);
      }
    } else {
      metodoValidacion(email, res);
    }

    // Si no existe el email continue al controlador
    next();
  } catch (error) {
    console.log(error);
  }
};

const metodoValidacion = async (email, res) => {
  // Buscar el nuevo email que digito el usuario
  const emailExiste = await prisma.usuarios.findUnique({
    where: {
      email,
    },
  });

  if (emailExiste) {
    return res
      .status(400)
      .json({ msg: "Ese email ya esta registrado", error: true });
  }
};

export default validarEmail;
