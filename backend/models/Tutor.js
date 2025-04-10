// Tutor Model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Tutor = sequelize.define('Tutor', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teacher_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teachers', // Reference to the teachers table
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'classes', // Reference to the classes table
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
}, {
  timestamps: false,
  tableName: 'tutors',
});

module.exports = Tutor;
