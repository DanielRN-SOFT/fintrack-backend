import { usuarios_estado } from "@prisma/client";
import prisma from "../../prismaClient.js";
import bcrypt from "bcryptjs";
import generarId from "../helpers/generarId.js";

export const createUsuarios = async (req, res) => {
  try {
    // Descomprimir los datos y hashear el password
    const data = {
      nombre: req.body.nombre,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      roles_id: req.body.roles_id,
      estado: usuarios_estado.Activo,
      token: generarId(),
    };

    // Crear un usuario con PRISMA
    const results = await prisma.usuarios.create({
      data,
    });

    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const getUsuarios = async (req, res) => {
  try {
    // Obtener todos los usuarios con PRISMA
    const results = await prisma.usuarios.findMany();
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    // Obtener el id
    let id = parseInt(req.params.id);

    // Encontrar un usuario por su id con PRISMA
    const results = await prisma.usuarios.findUnique({ where: { id } });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const updateUsuarios = async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    const { password } = req.body;
    const usuario = await prisma.usuarios.findUnique({ where: { id } });

    if (!usuario) {
      const error = new Error("El usuario no existe");
      return res.status(400).json({ msg: error.message, success: false });
    }

    // Descomprimir los datos y hashear el password
    const data = {
      nombre: req.body.nombre,
      email: req.body.email,
      roles_id: req.body.roles_id,
      estado: usuarios_estado.Activo,
      telefono: req.body.telefono,
    };

    if (!(await bcrypt.compare(password, usuario.password))) {
      data.password = bcrypt.hashSync(password, 10);
    }

    const results = await prisma.usuarios.update({
      where: { id },
      data,
    });

    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

export const inactivarUsuarios = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const existeUsuario = await prisma.usuarios.findUnique({ where: { id } });

    if (!existeUsuario) {
      const error = new Error("El usuario no existe");
      return res.status(400).json({ msg: error.message, success: false });
    }
    const estado = "Inactivo";

    let data = {
      estado,
    };

    const results = await prisma.usuarios.update({
      where: { id },
      data,
    });

    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

export const activarUsuarios = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const existeUsuario = await prisma.usuarios.findUnique({ where: { id } });

    if (!existeUsuario) {
      const error = new Error("El usuario no existe");
      return res.status(400).json({ msg: error.message, success: false });
    }
    const estado = "Activo";

    let data = {
      estado,
    };

    const results = await prisma.usuarios.update({
      where: { id },
      data,
    });

    res.json(results);
  } catch (error) {
    console.log(error);
  }
};
