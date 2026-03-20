import { Router } from "express";
import validarCategoriaConcepto from "../middlewares/validators/conceptos/validar_categoria_concepto.middleware.js";
import checkRol from "../middlewares/rol.middleware.js";
import checkAuth from "../middlewares/auth.middleware.js";
import * as conceptoCtr from "../controllers/conceptos.controller.js";

const router = Router();

router.get("/conceptos", checkAuth, conceptoCtr.getConceptos);
router.get("/conceptos/:id", checkAuth, checkRol, conceptoCtr.getConceptoById);
router.post(
  "/conceptos",
  checkAuth,
  validarCategoriaConcepto,
  conceptoCtr.createConcepto,
);
router.put(
  "/conceptos/:id",
  checkAuth,
  checkRol,
  validarCategoriaConcepto,
  conceptoCtr.updateConcepto,
);
router.delete(
  "/conceptos/:id",
  checkAuth,
  checkRol,
  conceptoCtr.deleteConcepto,
);

export default router;
