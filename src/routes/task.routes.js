import { Router } from 'express';
import { createTask, getTasks } from '../controllers/task.controller.js';

const router = Router();

router.post('/tasks', createTask);
router.get('/tasks', getTasks);

export default router;
