import { Router } from 'express';
import { 
  createUser, 
  getUsers, 
  getUserById, 
  updateUser, 
  deleteUser 
} from '../controllers/user.controller.js';

const router = Router();

// Rutas para Usuarios - Cumpliendo consignas exactas:
router.post('/', createUser);          
router.get('/', getUsers);             
router.get('/:id', getUserById);       
router.put('/:id', updateUser);        
router.delete('/:id', deleteUser);     

export default router;