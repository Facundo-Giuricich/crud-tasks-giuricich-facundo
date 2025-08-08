import Task from '../models/task.model.js';

// Crear tarea
export const createTask = async (req, res) => {
  try {
    const { title, description, isComplete } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Título y descripción son obligatorios.' });
    }

    const existing = await Task.findOne({ where: { title } });
    if (existing) return res.status(400).json({ message: 'Título ya existe.' });

    const newTask = await Task.create({ title, description, isComplete });
    res.status(201).json({ message: 'Tarea creada con éxito.', data: newTask });

  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea.', error: error.message });
  }
};

// Obtener todas las tareas
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas.', error: error.message });
  }
};

// Obtener tarea por ID
export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada.' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tarea.', error: error.message });
  }
};

// Actualizar tarea
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isComplete } = req.body;

    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada.' });

    const existing = await Task.findOne({ where: { title } });
    if (existing && existing.id !== parseInt(id)) {
      return res.status(400).json({ message: 'Ese título ya existe en otra tarea.' });
    }

    task.title = title;
    task.description = description;
    task.isComplete = isComplete;
    await task.save();

    res.status(200).json({ message: 'Tarea actualizada.', data: task });

  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar tarea.', error: error.message });
  }
};

// Eliminar tarea
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada.' });

    await task.destroy();
    res.status(200).json({ message: 'Tarea eliminada con éxito.' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar tarea.', error: error.message });
  }
};
