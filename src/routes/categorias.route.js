import { Router } from "express";
import * as categoriaCtr from "../controllers/categorias.controller.js";
import checkRol from "../middlewares/rol.middleware.js";
import checkAuth from "../middlewares/auth.middleware.js";
import validarCategoria from "../middlewares/validators/categorias/validar_categoria.middleware.js";

const router = Router();

router.get("/categorias", checkAuth, categoriaCtr.getCategorias);
router.get("/categorias/:id", checkAuth, categoriaCtr.getCategoriaById);
router.post("/categorias", checkAuth, categoriaCtr.createCategoria);
router.put("/categorias/:id", checkAuth,checkRol, validarCategoria, categoriaCtr.updateCategoria);
router.delete("/categorias/:id", checkAuth, checkRol, validarCategoria, categoriaCtr.deleteCategoria);

export default router;
