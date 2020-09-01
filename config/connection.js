// requirements //
require('dotenv').config();
const Sequelize = require('sequelize');

// creates or accesses the sequelize database of the user, by using .env file for mysql credentials //
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,
    },
  });

module.exports = sequelize;
