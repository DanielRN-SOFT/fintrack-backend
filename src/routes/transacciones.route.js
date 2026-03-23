import { Router } from "express";
import * as transaccionesCtr from "../controllers/transacciones.controller.js";
import checkAuth from "../middlewares/auth.middleware.js";
import checkRol from "../middlewares/rol.middleware.js";
import validarCuenta from "../middlewares/validators/transacciones/validar_cuenta.middleware.js";
import calcularSaldo from "../middlewares/validators/transacciones/calcular_saldo_cuenta.middleware.js";
import validarConcepto from "../middlewares/validators/transacciones/validar_concepto.middleware.js";
import reponerSaldo from "../middlewares/validators/transacciones/reponer_saldo.middleware.js";

const router = Router();

router.get("/transacciones", checkAuth, transaccionesCtr.getTransacciones);
router.get(
  "/transacciones/:id",
  checkAuth,
  checkRol,
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
  reponerSaldo,
  calcularSaldo,
  validarConcepto,
  transaccionesCtr.updateTransaccion,
);
router.put(
  "/transacciones/eliminar/:id",
  checkAuth,
  checkRol,
  reponerSaldo,
  transaccionesCtr.deleteTransaccion,
);
router.put(
  "/transacciones/activar/:id",
  checkAuth,
  checkRol,
  reponerSaldo,
  transaccionesCtr.activeTransaccion,
);

export default router;
