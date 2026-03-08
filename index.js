// Dependencias a utilizar
import app from "./app.js";
import dotenv from "dotenv";

// Activar variables de entorno
dotenv.config();

const port = 3000 || process.env.PORT_APP;

// Inicializar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});

