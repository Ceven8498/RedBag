const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Rating extends Model {}

Rating.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
<<<<<<< HEAD
          user_id: {
=======
          rated_by: {
>>>>>>> Develop
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'user',
              key: 'id'
            }
          },
<<<<<<< HEAD
          rated_id: {
=======
          user_id: {
>>>>>>> Develop
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
              model: 'user',
              key: 'id'
            }
          },
          rating_value: {
              type: DataTypes.INTEGER,
              allowNull: false
          }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'rating'
    }
);

module.exports = Rating;