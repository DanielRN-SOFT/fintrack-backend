import { Router } from "express";
import * as usuarioCtr from "../controllers/usuario.controller.js";
import validarEmail from "../middlewares/validators/usuarios/create.middleware.js";

const router = Router();

router.get("/usuarios", usuarioCtr.getUsuarios);
router.post("/usuarios", validarEmail, usuarioCtr.createUsuarios);

export default router;
