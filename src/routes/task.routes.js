import { Router } from 'express';
import { 
  createTask, 
  getTasks, 
  getTaskById, 
  updateTask, 
  deleteTask 
} from '../controllers/task.controller.js';

const router = Router();

// Rutas para Tareas - Cumpliendo consignas exactas:
router.post('/tasks', createTask);          
router.get('/tasks', getTasks);             
router.get('/tasks/:id', getTaskById);      
router.put('/tasks/:id', updateTask);       
router.delete('/tasks/:id', deleteTask);    

export default router;