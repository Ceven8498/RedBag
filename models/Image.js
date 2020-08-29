// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Image extends Model {}

Image.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            primaryKey: true,
            autoIncrement: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image_name: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: 'image'
    }
);

module.exports = Image;