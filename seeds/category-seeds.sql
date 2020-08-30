const { Category } = require('../models');

const categoryData = [
  {
    category_name: 'Electronics',
  },
  {
    category_name: 'Furniture',
  },
  {
    category_name: 'Clothing',
  },
  {
    category_name: 'Outdoors',
  },
  {
    category_name: 'Automobile'
  }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;