// Dependencias a utilizar
import express from "express";
import cors from "cors";
import usuarioRouter from "./src/routes/usuario.route.js";
import authRouter from "./src/routes/auth.route.js";
import cuentaRouter from "./src/routes/cuentas.route.js";
import categoriaRouter from "./src/routes/categorias.route.js";
import conceptoRouter from "./src/routes/concepto.route.js";
import transaccionRouter from "./src/routes/transacciones.route.js";
import dashboardRouter from "./src/routes/dashboard.controller.js";

// Inicialiazacion de la aplicacion
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Rutas
app.use("/api", usuarioRouter);
app.use("/api", authRouter);
app.use("/api", cuentaRouter);
app.use("/api", categoriaRouter);
app.use("/api", conceptoRouter);
app.use("/api", transaccionRouter);
app.use("/api", dashboardRouter)

export default app;
