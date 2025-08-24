import { User } from '../models/user.model.js';

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validaciones básicas
    if (!name || !email || !password || name.length > 100 || email.length > 100 || password.length > 100) {
      return res.status(400).json({ message: 'Datos inválidos o campos vacíos' });
    }

    // Verifica unicidad de email
    const emailExists = await User.findOne({ where: { email } });
    if (emailExists) {
      return res.status(400).json({ message: 'El email ya existe' });
    }

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: 'Usuario creado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Validaciones
    if (!name || !email || !password || name.length > 100 || email.length > 100 || password.length > 100) {
      return res.status(400).json({ message: 'Datos inválidos o campos vacíos' });
    }

    // Verifica unicidad de email, excluyendo al usuario actual
    const emailExists = await User.findOne({ where: { email, id: { $ne: id } } });
    if (emailExists) {
      return res.status(400).json({ message: 'El email ya existe' });
    }

    await user.update({ name, email, password });
    res.status(200).json({ message: 'Usuario actualizado', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
  }
};