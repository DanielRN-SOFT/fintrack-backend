import { Router } from "express";
import * as authCtr from "../controllers/auth.controller.js";

const router = Router();

// Rutas publicas
router.get("/auth/confirmar/:token", authCtr.confirmarUsuario);
router.post("/auth/autenticar", authCtr.autenticarUsuario);
router.post("/auth/olvide-password", authCtr.olvidePassword);
router
  .route("/auth/olvide-password/:token")
  .get(authCtr.comprobarToken)
  .post(authCtr.recuperarPassword);

export default router;
