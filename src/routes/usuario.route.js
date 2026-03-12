import { Router } from "express";
import * as usuarioCtr from "../controllers/usuario.controller.js";
import * as authCtr from "../controllers/auth.controller.js";
import checkAuth from "../middlewares/auth.middleware.js";
import validarEmailCreate from "../middlewares/validators/usuarios/validar_email_create.middleware.js";
import validarEmailUpdate from "../middlewares/validators/usuarios/validar_email_update.middleware.js";

const router = Router();

// Rutas publicas
router.get("/auth/confirmar/:token", authCtr.confirmarUsuario);
router.post("/auth/autenticar", authCtr.autenticarUsuario);
router.post("/auth/olvide-password", authCtr.olvidePassword);
router.route("/auth/olvide-password/:token").get(authCtr.comprobarToken).post(authCtr.actualizarPassword);

// Rutas privadas
router.get("/usuarios", checkAuth, usuarioCtr.getUsuarios);
router.get("/usuarios/:id", checkAuth , usuarioCtr.getUsuarioById);
router.post("/usuarios", checkAuth, validarEmailCreate, usuarioCtr.createUsuarios);
router.put("/usuarios/:id",checkAuth, validarEmailUpdate, usuarioCtr.updateUsuarios);

export default router;
