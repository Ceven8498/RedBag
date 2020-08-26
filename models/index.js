// import all models
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');

// Create associations

Product.belongsTo(Category, {
    foreignKey: 'category_id',
  });
  
  
  Category.hasMany(Product, {
    foreignKey: 'category_id',
  });


  User.hasMany(Product, {
    foreignKey: 'user_id'
  });

  Product.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
  });






module.exports = { User, Category, Product };