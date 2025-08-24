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

    // Validaciones según consignas: título único, no vacío, máximo 100 caracteres
    if (!title || title.length > 100) {
      return res.status(400).json({ message: 'El título es requerido y no puede exceder 100 caracteres' });
    }

    if (!description || description.length > 100) {
      return res.status(400).json({ message: 'La descripción es requerida y no puede exceder 100 caracteres' });
    }

    // Verificar unicidad del título
    const existingTask = await Task.findOne({ where: { title } });
    if (existingTask) {
      return res.status(400).json({ message: 'El título de la tarea ya existe' });
    }

    const task = await Task.create({ 
      title, 
      description, 
      isComplete: isComplete || false, 
      user_id 
    });
    
    res.status(201).json({ 
      message: 'Tarea creada con éxito', 
      task 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al crear tarea', 
      error: error.message 
    });
  }
};

// Listar todas las tareas con el usuario
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: { 
        model: User, 
        as: 'user', 
        attributes: ['id', 'name', 'email'] 
      }
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener tareas', 
      error: error.message 
    });
  }
};

// Obtener una tarea por ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id, {
      include: { 
        model: User, 
        as: 'user', 
        attributes: ['id', 'name', 'email'] 
      }
    });
    
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener tarea', 
      error: error.message 
    });
  }
};

// Actualizar tarea
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete, user_id } = req.body;

    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    // Validaciones según consignas
    if (title && title.length > 100) {
      return res.status(400).json({ message: 'El título no puede exceder 100 caracteres' });
    }
    
    if (description && description.length > 100) {
      return res.status(400).json({ message: 'La descripción no puede exceder 100 caracteres' });
    }

    // Verificar unicidad del título (excluyendo la tarea actual)
    if (title && title !== task.title) {
      const existingTask = await Task.findOne({ where: { title } });
      if (existingTask) {
        return res.status(400).json({ message: 'El título de la tarea ya existe' });
      }
    }

    // Validar usuario si se está cambiando
    if (user_id && user_id !== task.user_id) {
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(400).json({ message: 'El usuario no existe' });
      }
    }

    await task.update({ 
      title, 
      description, 
      isComplete, 
      user_id 
    });
    
    res.status(200).json({ 
      message: 'Tarea actualizada', 
      task 
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al actualizar tarea', 
      error: error.message 
    });
  }
};

// Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    await task.destroy();
    res.status(200).json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al eliminar tarea', 
      error: error.message 
    });
  }
};
