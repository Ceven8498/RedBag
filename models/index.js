// import all models
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Rating = require('./Rating');

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

Rating.belongsTo(User, {
<<<<<<< HEAD
  foreignKey: 'user_id'
});

Rating.belongsTo(User, {
  foreignKey: 'rated_id'
});

User.hasMany(Rating, {
  foreignKey: 'rated_id'
=======
  foreignKey: 'rated_by'
});

Rating.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Rating, {
  foreignKey: 'user_id'
>>>>>>> Develop
});



module.exports = { User, Category, Product, Rating };