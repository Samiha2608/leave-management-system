const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// HOD Model
const HOD = sequelize.define('HOD', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  first_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(50),
    defaultValue: 'HOD', // Set default role
  },
}, {
  timestamps: false,
  tableName: 'hods',
});

module.exports = HOD;
