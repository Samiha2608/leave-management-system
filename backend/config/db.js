const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10), // Convert to integer
  dialect: 'mysql',
  logging: false,
  dialectOptions: {
    connectTimeout: 60000, // Increase timeout to 60 seconds
    // You might need SSL for Railway
    ssl: {
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5, // Maximum number of connections in pool
    min: 0, // Minimum number of connections in pool
    acquire: 60000, // Maximum time (ms) to get a connection from the pool
    idle: 10000 // Maximum time (ms) that a connection can be idle before being released
  },
  retry: {
    max: 3 // Maximum retry attempts
  }
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
