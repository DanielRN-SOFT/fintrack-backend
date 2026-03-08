// Dependencias a utilizar
import express from "express";
import cors from "cors";

// Inicialiazacion de la aplicacion
const app = express();

// Middlewares
app.use(express.json())
app.use(cors());


// Rutas


export default app;



