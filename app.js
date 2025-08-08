import express from 'express';
import { sequelize } from './src/config/database.js';
import usersRoutes from './src/routes/user.routes.js';
import tasksRoutes from './src/routes/task.routes.js';

const app = express();
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/tasks', tasksRoutes);

// Sincroniza modelos
sequelize.sync()
  .then(() => console.log('Base de datos sincronizada'))
  .catch((err) => console.error('Error al sincronizar la base de datos', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});