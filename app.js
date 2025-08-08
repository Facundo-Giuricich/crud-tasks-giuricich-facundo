import express from 'express';
import dotenv from 'dotenv';
import sequelize from './src/config/database.js';
import userRoutes from './src/routes/user.routes.js';
import taskRoutes from './src/routes/task.routes.js';

dotenv.config();
const app = express();
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Conexión y servidor
try {
  await sequelize.sync({ force: false });
  console.log('Base de datos conectada');
  app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
} catch (error) {
  console.error('Error al conectar la BD:', error);
}
