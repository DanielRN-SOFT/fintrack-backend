import { Router } from "express";
import * as cuentaCtr from "../controllers/cuentas.controller.js";
import checkRol from "../middlewares/rol.middleware.js";
import checkAuth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/cuentas", checkAuth, cuentaCtr.getCuentas);
router.get("/cuentas/:id", checkAuth, cuentaCtr.getCuentaById);
router.post("/cuentas", checkAuth, cuentaCtr.createCuenta);
router.put("/cuentas/:id", checkAuth, checkRol, cuentaCtr.updateCuenta);
router.delete("/cuentas/:id", checkAuth, checkRol, cuentaCtr.deleteCuenta);

export default router;