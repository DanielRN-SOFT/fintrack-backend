import { cuentas_tipo } from "@prisma/client";
import prisma from "../../prismaClient.js";

export const getCuentas = async (req, res) => {
  try {
    const usuarios_id = req.usuario.id;
    const results = await prisma.cuentas.findMany({ where: { usuarios_id } });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};
export const getCuentaById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuarios_id = parseInt(req.usuario.id);

    const results = await prisma.cuentas.findUnique({
      where: { id, usuarios_id },
    });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const createCuenta = async (req, res) => {
  try {
    const data = {
      nombre: req.body.nombre,
      tipo: cuentas_tipo[req.body.tipo],
      saldo_inicial: req.body.saldo_inicial,
      usuarios_id: req.usuario.id,
    };
    const results = await prisma.cuentas.create({ data });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const updateCuenta = async (req, res) => {
  try {
    let id = parseInt(req.params.id);

    const data = {
      nombre: req.body.nombre,
      tipo: cuentas_tipo[req.body.tipo],
      saldo_inicial: req.body.saldo_inicial,
    };

    const results = await prisma.cuentas.update({
      where: { id },
      data,
    });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCuenta = async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    const existeCuenta = await prisma.cuentas.findUnique({ where: { id } });

    if (!existeCuenta) {
      const error = new Error("Esa cuenta no existe");
      return res.status(400).json({ msg: error.message, success: false });
    }

    const existeTransaccion = await prisma.transacciones.findFirst({
      where: { cuentas_id: id },
    });

    if (existeTransaccion) {
      const error = new Error("Esa cuenta esta asociada a una transaccion");
      return res.status(403).json({ msg: error.message, success: false });
    }

    const results = await prisma.cuentas.delete({
      where: { id },
    });
    res.json({ results });
  } catch (error) {
    console.log(error);
  }
};
