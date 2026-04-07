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
import dotenv from "dotenv";
dotenv.config();

// Inicialiazacion de la aplicacion
const app = express();

const dominiosPermitidos = [process.env.FRONTEND_URL];

// Optiones para habiliar URLs
const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== 1) {
      // El origin del request esta permitido
      callback(null, true);
    } else {
      callback(new Error("No permitido en CORS"));
    }
  },
};

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

// Rutas
app.use("/api", usuarioRouter);
app.use("/api", authRouter);
app.use("/api", cuentaRouter);
app.use("/api", categoriaRouter);
app.use("/api", conceptoRouter);
app.use("/api", transaccionRouter);
app.use("/api", dashboardRouter);

export default app;
