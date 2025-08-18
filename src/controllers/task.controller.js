import { Task } from '../models/task.model.js';
import { User } from '../models/user.model.js';

// Crear tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete, user_id } = req.body;

    // Validar que el usuario exista
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ message: 'El usuario no existe' });
    }

    const task = await Task.create({ title, description, isComplete, user_id });
    res.status(201).json({ message: 'Tarea creada con éxito', task });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea', error: error.message });
  }
};

// Listar todas las tareas con el usuario
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: { model: User, as: 'user', attributes: ['id', 'name', 'email'] }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas', error: error.message });
  }
};
