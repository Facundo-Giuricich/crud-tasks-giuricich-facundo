import User from '../models/user.model.js';

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'Email ya registrado.' });

    const newUser = await User.create({ name, email, password });
    res.status(201).json({ message: 'Usuario creado con éxito.', data: newUser });

  } catch (error) {
    res.status(500).json({ message: 'Error al crear usuario.', error: error.message });
  }
};

// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios.', error: error.message });
  }
};

// Obtener usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario.', error: error.message });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    const existing = await User.findOne({ where: { email } });
    if (existing && existing.id !== parseInt(id)) {
      return res.status(400).json({ message: 'Ese email ya está en uso por otro usuario.' });
    }

    user.name = name;
    user.email = email;
    user.password = password;
    await user.save();

    res.status(200).json({ message: 'Usuario actualizado con éxito.', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar usuario.', error: error.message });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });

    await user.destroy();
    res.status(200).json({ message: 'Usuario eliminado con éxito.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario.', error: error.message });
  }
};
