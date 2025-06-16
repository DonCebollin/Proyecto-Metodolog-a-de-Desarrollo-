"use strict"
import cors from "cors";
import express from "express";
import morgan from "morgan";
import indexRoutes from "./src/routes/index.routes.js";
import { PORT, HOST } from "./src/config/configEnv.js";
import { connectDB } from "./src/config/configDb.js";
import { createUsers } from "./src/config/initDb.js";

async function setupServer() {
  // Crea la instancia de Express
  const app = express();
  app.disable("x-powered-by");

  // Habilita el CORS para permitir solicitudes desde otros dominios (frontend)
  app.use(
    cors({
      credentials: true,
      origin: true,
    })
  );

  // Avisa a express que use JSON
  app.use(express.json());

  // Configura el middleware de morgan para registrar las peticiones HTTP
  app.use(morgan("dev"));

  // Configura las rutas de la API
  app.use("/api", indexRoutes);

  // Enciende el servidor
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en ${HOST}:${PORT}`);
  });
}

// Función para configurar la API
async function setupAPI() {
  try {
    // Conecta la base de datos
    await connectDB();
    // Crea los usuarios iniciales
    await createUsers();
    // Configura el servidor
    await setupServer();
  } catch (error) {
    console.error("Error en index.js -> setupAPI(): ", error);
  }
}

// Inicia la configuración de la API
setupAPI()
  .then(() => console.log("=> API Iniciada exitosamente"))
  .catch((error) => console.log("Error en index.js -> setupAPI(): ", error));
