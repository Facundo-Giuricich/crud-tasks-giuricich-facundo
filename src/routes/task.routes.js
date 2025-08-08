import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';

const router = Router();

// Crear tarea
router.post('/', createTask);

// Obtener todas las tareas
router.get('/', getTasks);

// Obtener una tarea por ID
router.get('/:id', getTaskById);

// Actualizar tarea por ID
router.put('/:id', updateTask);

//  Eliminar tarea por ID
router.delete('/:id', deleteTask);

export default router;