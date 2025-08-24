import express from 'express';
import taskRoutes from './src/routes/task.routes.js';
import userRoutes from './src/routes/user.routes.js';
import { sequelize } from './src/config/database.js'; // Importar sequelize
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// Rutas
app.use('/api', taskRoutes);
app.use('/api/users', userRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Tareas y Usuarios funcionando' });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Sincronizar la base de datos y luego iniciar el servidor
const PORT = process.env.PORT || 3000;

sequelize.sync({ force: false })
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en puerto ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });

export default app;