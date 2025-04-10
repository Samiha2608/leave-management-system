const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: true,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING(50),
    defaultValue: 'student',
  },
  registration_number: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,  // Correct data type for timestamps
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,  // Disable automatic timestamps (createdAt, updatedAt)
  tableName: 'students',  // Optional: define table name explicitly
});

module.exports = Student;
