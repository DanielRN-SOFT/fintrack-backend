// Dependencias a utilizar
import express from "express";
import cors from "cors";
import usuarioRouter from "./src/routes/usuario.route.js";

// Inicialiazacion de la aplicacion
const app = express();

// Middlewares
app.use(express.json())
app.use(cors());


// Rutas
app.use("/api", usuarioRouter);


export default app;



