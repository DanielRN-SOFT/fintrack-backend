import { Router } from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import checkAuth from "../middlewares/auth.middleware.js";

const router = Router();

// Ruta del dashboard
router.get("/dashboard", checkAuth, getDashboard);

export default router;
