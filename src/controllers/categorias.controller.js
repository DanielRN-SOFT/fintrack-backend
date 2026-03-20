import { categorias_tipo } from "@prisma/client";
import prisma from "../../prismaClient.js";

export const getCategorias = async (req, res) => {
  try {
    const usuarios_id = req.usuario.id;
    const results = await prisma.categorias.findMany({
      where: { usuarios_id },
    });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};
export const getCategoriaById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuarios_id = parseInt(req.usuario.id);

    const results = await prisma.categorias.findUnique({
      where: { id, usuarios_id },
    });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const createCategoria = async (req, res) => {
  try {
    const data = {
      nombre: req.body.nombre,
      usuarios_id: req.usuario.id,
      tipo: categorias_tipo[req.body.tipo],
    };
    const results = await prisma.categorias.create({ data });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const updateCategoria = async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    const data = {
      nombre: req.body.nombre,
      tipo: categorias_tipo[req.body.tipo],
    };

    const results = await prisma.categorias.update({
      where: { id },
      data,
    });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoria = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    
    const existeConcepto = await prisma.conceptos.findFirst({
      where: { categorias_id: id },
    });

    if (existeConcepto) {
      const error = new Error("Esa categoria esta asociada a un concepto");
      return res.status(400).json({ msg: error.message, success: false });
    }

    const results = await prisma.categorias.delete({
      where: { id },
    });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};
