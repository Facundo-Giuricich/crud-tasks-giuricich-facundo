import express from 'express';
import taskRoutes from './src/routes/task.routes.js';

const app = express();
app.use(express.json());

app.use('/api', taskRoutes);

export default app ;
