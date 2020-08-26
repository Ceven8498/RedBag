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







module.exports = { User, Category, Product };