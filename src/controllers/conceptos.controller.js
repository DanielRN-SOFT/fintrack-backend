import prisma from "../../prismaClient.js";

export const getConceptos = async (req, res) => {
  try {
    const usuarios_id = req.usuario.id;
    const results = await prisma.conceptos.findMany({
      where: { usuarios_id },
      include: { categorias: true },
    });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const getConceptoById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuarios_id = req.usuario.id;
    const results = await prisma.conceptos.findMany({
      where: { usuarios_id, id },
      include: {
        categorias: true,
      },
    });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const createConcepto = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const { nombre, categorias_id } = req.body;

    const data = {
      nombre: nombre,
      categorias_id: categorias_id,
      usuarios_id: usuario_id,
    };
    const results = await prisma.conceptos.create({ data });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const updateConcepto = async (req, res) => {
  try {
    const usuario_id = req.usuario.id;
    const id = parseInt(req.params.id);
    const { nombre, categorias_id } = req.body;

    const data = {
      nombre: nombre,
      categorias_id: categorias_id,
      usuarios_id: usuario_id,
    };
    const results = await prisma.conceptos.update({ where: { id }, data });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const deleteConcepto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuarios_id = req.usuario.id;

    const existeTransaccion = await prisma.transacciones.findFirst({
      where: { usuarios_id, conceptos_id: id },
    });

    if (existeTransaccion) {
      const error = new Error("Ese concepto esta asociado a una transaccion");
      return res.status(403).json({ msg: error.message, success: false });
    }

    const results = await prisma.conceptos.delete({ where: { id } });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};
