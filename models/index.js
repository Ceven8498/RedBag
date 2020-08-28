// import all models
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Rating = require('./Rating');


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

Rating.belongsTo(User, {
  foreignKey: 'rated_by'
});

<<<<<<< HEAD
module.exports = { User, Category, Product};
=======
Rating.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Rating, {
  foreignKey: 'user_id'
});



module.exports = { User, Category, Product, Rating };
>>>>>>> efb25043319b2d2d0d1f3b1b8c9f6fbdc3c74be0
