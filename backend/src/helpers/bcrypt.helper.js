"use strict";
import bcrypt from "bcrypt";

// Función helper para encriptar y contraseñas
export async function encryptPassword(password) {
  try {
    // Generar un salt y encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error en bcrypt.helper.js -> encryptPassword(): ", error);
    throw new Error("Error al encriptar la contraseña");
  }
}

// Función helper para comparar contraseñas
export async function comparePassword(password, receivedPassword) {
  try {
    return await bcrypt.compare(password, receivedPassword);
  } catch (error) {
    console.error("Error en bcrypt.helper.js -> comparePassword(): ", error);
    throw new Error("Error al comparar las contraseñas");
  }
}
