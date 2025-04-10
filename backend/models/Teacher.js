const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Teacher = sequelize.define('Teacher', {
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
    allowNull: true,
    defaultValue: 'Computer Science',
  },
  role: {
    type: DataTypes.STRING(50),
    defaultValue: 'teacher',
  },
  created_at: {
    type: DataTypes.DATE,  // Correct data type for timestamps
    defaultValue: DataTypes.NOW,
  },
  class_id: {
    type: DataTypes.INTEGER,
    allowNull: true, // Adjust as necessary, e.g., false if it's required
    references: {
      model: 'tutors', // name of the table you're referencing
      key: 'class_id', // name of the field in the referenced table
    },
  },
}, {
  timestamps: false, // Disable automatic timestamps like updatedAt
  tableName: 'teachers', // Optional: define table name explicitly
});

module.exports = Teacher;
