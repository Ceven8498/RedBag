// import all models
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
const Rating = require('./Rating');
const Comment = require('./Comment');
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
  foreignKey: 'rated_by'
});

Rating.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Rating, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

Comment.belongsTo(Rating, {
  foreignKey: 'rating_id',
  onDelete: 'SET NULL'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

module.exports = { User, Category, Product, Rating, Comment };