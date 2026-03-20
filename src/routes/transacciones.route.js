import { Router } from "express";
import * as transaccionesCtr from "../controllers/transacciones.controller.js";
import checkAuth from "../middlewares/auth.middleware.js";
import checkRol from "../middlewares/rol.middleware.js";
import validarCuenta from "../middlewares/validators/transacciones/validar_cuenta.middleware.js";
import calcularSaldo from "../middlewares/validators/transacciones/calcular_saldo_cuenta.middleware.js";
import validarConcepto from "../middlewares/validators/conceptos/validar_concepto.middleware.js";

const router = Router();

router.get("/transacciones", checkAuth, transaccionesCtr.getTransacciones);
router.get(
  "/transacciones/:id",
  checkAuth,
  transaccionesCtr.getTransaccionById,
);
router.post(
  "/transacciones",
  checkAuth,
  validarCuenta,
  calcularSaldo,
  validarConcepto,
  transaccionesCtr.createTransaccion,
);
router.put(
  "/transacciones/:id",
  checkAuth,
  checkRol,
  validarCuenta,
  calcularSaldo,
  validarConcepto,
  transaccionesCtr.updateTransaccion,
);
router.put(
  "/transacciones/eliminar/:id",
  checkAuth,
  checkRol,
  transaccionesCtr.deleteTransaccion,
);
router.put(
  "/transacciones/activar/:id",
  checkAuth,
  checkRol,
  transaccionesCtr.activeTransaccion,
);

export default router;
