"use strict";
import { DataSource } from "typeorm"
import { DATABASE, DB_USERNAME, HOST, PASSWORD } from "./configEnv.js";

// Configuración de la conexión a la base de datos
export const AppDataSource = new DataSource({
    type: "postgres",
    host: `${HOST}`,
    port: 5432,
    username: `${DB_USERNAME}`,
    password: `${PASSWORD}`,
    database: `${DATABASE}`,
    entities: ["src/entity/**/*.js"],
    synchronize: true,
    logging: false,
});

// Función para conectar a la base de datos
export async function connectDB() {
    try {
        await AppDataSource.initialize();
        console.log("=> Conexión con la base de datos exitosa!");
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error);
        process.exit(1);
    }
}