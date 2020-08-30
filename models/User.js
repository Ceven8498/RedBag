const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection.js');
const Rating = require('./Rating.js');

// create our User model
class User extends Model {
    // set up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
      return bcrypt.compareSync(loginPw, this.password);
    }

    static rate(body, models){
      return models.Rating.create({
        user_id: body.user_id,
        product_id: body.product_id,
        rating_value: body.rating_value
      }),then(() => {
        return Product.findOne({
          where: {
            id: body.product_id
          },
          attributes: [
            'id',
            'product_name',
            'description',
            'price',
            'condition',
            'location',
            'category_id',
            'user_id',
            [
              sequelize.literal('(SELECT AVG(rating_value) FROM rating WHERE user.id = rating.rated_id)'),
              'rating_avg'
            ]
          ]
        });
      });
    }
}

  // create fields/columns for User model
User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4]
        }
      }
    },
    {
      hooks: {
        // set up beforeCreate lifecycle "hook" functionality
        async beforeCreate(newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
  
        async beforeUpdate(updatedUserData) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        }
      },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
  );

  module.exports = User;
  
