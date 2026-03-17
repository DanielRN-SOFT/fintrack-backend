import { transacciones_estado } from "@prisma/client";
import prisma from "../../prismaClient.js";

export const getTransacciones = async (req, res) => {
  try {
    const usuarios_id = req.usuario.id;
    const results = await prisma.transacciones.findMany({
      where: { usuarios_id },
      include: {
        cuentas: true,
        conceptos: true,
      },
    });
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

export const getTransaccionById = async (req, res) => {
  try {
    const usuarios_id = req.usuario.id;
    const id = parseInt(req.params.id);
    const results = await prisma.transacciones.findMany({
      where: { usuarios_id, id },
      include: {
        cuentas: true,
        conceptos: true,
      },
    });
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

export const createTransaccion = async (req, res) => {
  try {
    const usuarios_id = req.usuario.id;
    const data = {
      fecha: req.body.fecha,
      valor: req.body.valor,
      descripcion: req.body.descripcion,
      estado: transacciones_estado[req.body.estado],
      usuarios_id,
      cuentas_id: req.body.cuentas_id,
      conceptos_id: req.body.conceptos_id,
    };

    const results = await prisma.transacciones.create({ data });
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

export const updateTransaccion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const usuarios_id = req.usuario.id;
    const data = {
      fecha: req.body.fecha,
      valor: req.body.valor,
      descripcion: req.body.descripcion,
      estado: transacciones_estado[req.body.estado],
      usuarios_id,
      cuentas_id: req.body.cuentas_id,
      conceptos_id: req.body.conceptos_id,
    };

    const results = await prisma.transacciones.update({ where: { id }, data });
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

export const deleteTransaccion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = {
      estado: transacciones_estado.Anulada,
    };
    const results = await prisma.transacciones.update({ where: { id }, data });
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};

export const activeTransaccion = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = {
      estado: transacciones_estado.Activa,
    };
    const results = await prisma.transacciones.update({ where: { id }, data });
    res.json(results);
  } catch (error) {
    console.log(error);
  }
};
