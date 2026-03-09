import { usuarios_estado } from "@prisma/client";
import prisma from "../../prismaClient.js";
import bcrypt from "bcryptjs";

export const createUsuarios = async (req, res) => {
  try {
    const data = {
      nombre: req.body.nombre,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.nombre, 10),
      roles_id: req.body.roles_id,
      estado: usuarios_estado.Activo
    };
    const results = await prisma.usuarios.create({
      data,
    });

    res.json(results);
  } catch (error) {
    console.log(error);
  }
};


export const getUsuarios = async (req, res) => {
  try {
    const results = await prisma.usuarios.findMany();
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

