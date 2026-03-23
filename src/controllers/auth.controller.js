import prisma from "../../prismaClient.js";
import bcrypt from "bcryptjs";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";

export const confirmarUsuario = async (req, res) => {
  // Token para confirmar
  const { token } = req.params;

  // Encontrar el usuario por token 
  const usuarioConfirmado = await prisma.usuarios.findFirst({
    where: { token },
  });

  // Si no hay resultados en la consulta, se manda el error
  if (!usuarioConfirmado) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }

  // Se modifican los datos, token = null y confirmado true
  try {
    const data = {
      token: null,
      confirmado: true,
    };

    // Se obtiene el id del usuario a confirmar
    const id = usuarioConfirmado.id;

    // Actualizacion de la informacion
    await prisma.usuarios.update({ where: { id }, data });

    // Envio de los resultados
    res.json({ msg: "Usuario confirmado exitosamente" });
  } catch (error) {
    console.log(error);
  }
};

export const autenticarUsuario = async (req, res) => {
  try {
    // Varibles princiapales
    const { email, password } = req.body;

    // Verificar que el email existe en la base de datos
    const usuario = await prisma.usuarios.findUnique({ where: { email } });

    // En caso de que no exista, genere un error
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

    // Envio de la informacion
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
    // Variables principales
    const { email } = req.body;

    // Verificar que exista el usuario con el email ingresado
    const usuario = await prisma.usuarios.findUnique({ where: { email } });

    // Si no existe, se genera un error
    if (!usuario) {
      const error = new Error("El email no existe");
      return res.status(400).json({ msg: error.message, success: false });
    }

    // Se le genera el token para validarlo
    const data = {
      token: generarId(),
    };

    // Se le asigna al usuario en la base de datos
    await prisma.usuarios.update({
      where: { email },
      data,
    });

    // Se envia la informacion
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
    // Token de acceso
    const { token } = req.params;

    // Verificar que el usuario tenga el token asignado
    const tokenValido = await prisma.usuarios.findFirst({ where: { token } });

    // Si no existe, se genera un error
    if (!tokenValido) {
      const error = new Error("Token no valido");
      return res.status(403).json({ msg: error.message, success: false });
    }

    // Si pasa la validacion, mensaje de confirmacion
    res.status(200).json({ msg: "Token valido y el usuario existe" });
  } catch (error) {
    console.log(error);
  }
};

export const recuperarPassword = async (req, res) => {
  try {
    // Variables principales
    const { token } = req.params;
    const { password } = req.body;

    // Encontrar el usuario con el token
    const usuario = await prisma.usuarios.findFirst({ where: {token} });

    // Si el usuario no existe, se genera error
    if (!usuario) {
      const error = new Error("Hubo un error");
      return res.status(400).json({ msg: error.message });
    }

    // Se modifica el objeto con la nuevo info
    const data = {
      token: null,
      password: bcrypt.hashSync(password, 10),
    };

    // Se obtiene le id mediante destructuring
    const {id} = usuario;

    // Actualizacion de la informacion
    await prisma.usuarios.update({ where: { id }, data });

    // Se envia la informacion confirmando la accion
    res.json({ msg: "La contraseña ha sido restablecida exitosamente" });
  } catch (error) {
    console.log(error);
  }
};
