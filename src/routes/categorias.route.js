import { Router } from "express";
import * as categoriaCtr from "../controllers/categorias.controller.js";
import checkRol from "../middlewares/rol.middleware.js";
import checkAuth from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/categorias", checkAuth, categoriaCtr.getCategorias);
router.get("/categorias/:id", checkAuth, categoriaCtr.getCategoriaById);
router.post("/categorias", checkAuth, categoriaCtr.createCategoria);
router.put(
  "/categorias/:id",
  checkAuth,
  checkRol,
  categoriaCtr.updateCategoria,
);
router.delete(
  "/categorias/:id",
  checkAuth,
  checkRol,
  categoriaCtr.deleteCategoria,
);

export default router;
