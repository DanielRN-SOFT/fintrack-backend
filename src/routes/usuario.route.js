import { Router } from "express";
import * as usuarioCtr from "../controllers/usuario.controller.js";
import checkAuth from "../middlewares/auth.middleware.js";
import validarEmailCreate from "../middlewares/validators/usuarios/validar_email_create.middleware.js";
import validarEmailUpdate from "../middlewares/validators/usuarios/validar_email_update.middleware.js";

const router = Router();

// Rutas publicas
router.post("/usuarios", validarEmailCreate, usuarioCtr.createUsuarios);

// Rutas privadas
router.get("/usuarios", checkAuth, usuarioCtr.getUsuarios);
router.get("/usuarios/:id", checkAuth, usuarioCtr.getUsuarioById);
router.put(
  "/usuarios/:id",
  checkAuth,
  validarEmailUpdate,
  usuarioCtr.updateUsuarios,
);

router.put("/usuarios/inactivar/:id", checkAuth, usuarioCtr.inactivarUsuarios);
router.put("/usuarios/activar/:id", checkAuth, usuarioCtr.activarUsuarios);

export default router;
