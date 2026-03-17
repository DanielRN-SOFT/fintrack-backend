import { Router } from "express";
import * as transaccionesCtr from "../controllers/transacciones.controller.js";
import checkAuth from "../middlewares/auth.middleware.js";
import checkRol from "../middlewares/rol.middleware.js";

const router = Router();

router.get("/transacciones", checkAuth, transaccionesCtr.getTransacciones);
router.get("/transacciones/:id", checkAuth, transaccionesCtr.getTransaccionById);
router.post("/transacciones", checkAuth, transaccionesCtr.createTransaccion);
router.put("/transacciones/:id",checkAuth, checkRol, transaccionesCtr.updateTransaccion);
router.put("/transacciones/eliminar/:id", checkAuth, checkRol, transaccionesCtr.deleteTransaccion);
router.put("/transacciones/activar/:id", checkAuth, checkRol, transaccionesCtr.activeTransaccion);

export default router;
