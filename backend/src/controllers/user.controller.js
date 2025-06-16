"use strict";
import User from "../entity/user.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getUsers(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar todos los usuarios
    const userRepository = AppDataSource.getRepository(User);
    const users = await userRepository.find();

    res.status(200).json({ message: "Usuarios encontrados: ", data: users });
  } catch (error) {
    console.error("Error en user.controller.js -> getUsers(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function getUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar un usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });

    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res.status(200).json({ message: "Usuario encontrado: ", data: user });
  } catch (error) {
    console.error("Error en user.controller.js -> getUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function updateUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar un usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const { username, email, rut } = req.body;
    const user = await userRepository.findOne({ where: { id } });

    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Validar que al menos uno de los campos a actualizar esté presente
    user.username = username || user.username;
    user.email = email || user.email;
    user.rut = rut || user.rut;

    // Guardar los cambios en la base de datos
    await userRepository.save(user);

    res
      .status(200)
      .json({ message: "Usuario actualizado exitosamente.", data: user });
  } catch (error) {
    console.error("Error en user.controller.js -> updateUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function deleteUserById(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar el usuario por ID
    const userRepository = AppDataSource.getRepository(User);
    const { id } = req.params;
    const user = await userRepository.findOne({ where: { id } });

    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    // Eliminar el usuario de la base de datos
    await userRepository.remove(user);

    res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    console.error("Error en user.controller.js -> deleteUserById(): ", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

export async function getProfile(req, res) {
  try {
    // Obtener el repositorio de usuarios y buscar el perfil del usuario autenticado
    const userRepository = AppDataSource.getRepository(User);
    const userEmail = req.user.email;
    const user = await userRepository.findOne({ where: { email: userEmail } });
    
    // Si no se encuentra el usuario, devolver un error 404
    if (!user) {
      return res.status(404).json({ message: "Perfil no encontrado." });
    }

    // Formatear la respuesta excluyendo la contraseña
    const formattedUser = {
      id: user.id,
      username: user.username,
      email: user.email,
      rut: user.rut,
      role: user.role
    };

    res.status(200).json({ message: "Perfil encontrado: ", data: formattedUser });
  } catch (error) {
    console.error("Error en user.controller -> getProfile(): ", error);
    res.status(500).json({ message: "Error interno del servidor"})
  }
}