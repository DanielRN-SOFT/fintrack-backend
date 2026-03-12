import prisma from "../../prismaClient.js";
import bcrypt from "bcryptjs";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

export const confirmarUsuario = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmado = await prisma.usuarios.findFirst({
    where: { token },
  });
  if (!usuarioConfirmado) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const data = {
      token: null,
      confirmado: true,
    };
    const id = usuarioConfirmado.id;
    await prisma.usuarios.update({ where: { id }, data });
    res.json({ msg: "Usuario confirmado exitosamente" });
  } catch (error) {
    console.log(error);
  }
};

export const autenticarUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Verificar que el email existe
    const usuario = await prisma.usuarios.findUnique({ where: { email } });

    // Validar que el email existe
    if (!usuario) {
      const error = new Error("El email no existe");
      return res.status(403).json({ msg: error.message });
    }

    // Validar que la cuenta este confirmada
    if (!usuario.confirmado) {
      const error = new Error("Tu cuenta no ha sido confirmada");
      return res.status(403).json({ msg: error.message });
    }

    // Validar que las contraseñan coincidan
    if (!(await bcrypt.compare(password, usuario.password))) {
      const error = new Error("La contraseña es incorrecta");
      return res.status(403).json({ msg: error.message });
    }

    res.json({
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario.id),
    });
  } catch (error) {
    console.log(error);
  }
};

export const olvidePassword = async (req, res) => {
  try {
    const { email } = req.body;
    const usuario = await prisma.usuarios.findUnique({ where: { email } });
    if (!usuario) {
      const error = new Error("El email no existe");
      return res.status(400).json({ msg: error.message, success: false });
    }

    const data = {
      token: generarId(),
    };

    await prisma.usuarios.update({
      where: { email },
      data,
    });

    res.json({
      msg: "Hemos enviado un email con las instrucciones",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const comprobarToken = async (req, res) => {
  try {
    const { token } = req.params;
    const tokenValido = await prisma.usuarios.findFirst({ where: { token } });

    if (!tokenValido) {
      const error = new Error("Token no valido");
      return res.status(403).json({ msg: error.message, success: false });
    }

    res.status(200).json({ msg: "Token valido y el usuario existe" });
  } catch (error) {
    console.log(error);
  }
};

export const actualizarPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await prisma.usuarios.findFirst({ where: {token} });

    if (!usuario) {
      const error = new Error("Hubo un error");
      return res.status(400).json({ msg: error.message });
    }

    const data = {
      token: null,
      password: bcrypt.hashSync(password, 10),
    };

    const {id} = usuario;
    await prisma.usuarios.update({ where: { id }, data });
    res.json({ msg: "La contraseña ha sido restablecida exitosamente" });
  } catch (error) {
    console.log(error);
  }
};
