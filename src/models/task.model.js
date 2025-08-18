import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import { User } from './user.model.js';

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  description: { type: DataTypes.STRING(100), allowNull: false },
  isComplete: { type: DataTypes.BOOLEAN, defaultValue: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'tasks',
  timestamps: false
});

// Relaciones
User.hasMany(Task, { foreignKey: 'user_id', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

export { Task };
