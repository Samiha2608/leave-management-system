const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const TeacherLeave = sequelize.define('TeacherLeave', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  from_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  to_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  reason: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  rejoining_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  no_of_leaves: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  leave_type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  application_status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
  },
  medical_file_attachments: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  submitted_on: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  assigned_to: {
    type: DataTypes.STRING,
    allowNull: false, // Always 'hod' for teacher leaves
  },
  manager_remarks: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'none',
  },
  director_remarks: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'none',
  },
}, {
  tableName: 'teacher_leaves',
  timestamps: false,
});

module.exports = TeacherLeave;
