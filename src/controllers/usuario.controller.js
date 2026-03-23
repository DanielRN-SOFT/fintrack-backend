import { usuarios_estado } from "@prisma/client";
import prisma from "../../prismaClient.js";
import bcrypt from "bcryptjs";
import generarId from "../helpers/generarId.js";

export const createUsuarios = async (req, res) => {
  try {
    // Variables principales
    const { nombre, email, roles_id, password } = req.body;
    // Descomprimir los datos y hashear el password
    const data = {
      nombre,
      email,
      roles_id,
      password: bcrypt.hashSync(password, 10),
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
    // Variables principales
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
    // Variables principales
    let id = parseInt(req.params.id);
    const { nombre, email, roles_id, password, telefono } = req.body;

    // Llamado a la base de datos
    const usuario = await prisma.usuarios.findUnique({ where: { id } });

    // Descomprimir los datos
    const data = {
      nombre,
      email,
      roles_id,
      telefono,
      estado: usuarios_estado.Activo,
    };

    // Si la contraseña no es igual a la almacenada es porque la cambio
    if (!(await bcrypt.compare(password, usuario.password))) {
      data.password = bcrypt.hashSync(password, 10);
    }

    // Actualizar una entidad en prisma
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
    // Variables principales
    const id = parseInt(req.params.id);

    // Inactivar dicho usuario
    const results = await prisma.usuarios.update({
      where: { id },
      data: {
        estado: "Inactivo",
      },
    });

    // Enviar los resultados
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

export const activarUsuarios = async (req, res) => {
  try {
    // Variables principales
    let id = parseInt(req.params.id);

    // Activar el usuario eliminado
    const results = await prisma.usuarios.update({
      where: { id },
      data: {
        estado: "Activo",
      },
    });

    // Enviar los resultados
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};
