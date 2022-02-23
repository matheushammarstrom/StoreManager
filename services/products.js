const productsModel = require('../models/products');

const getAll = async () => {
  const response = await productsModel.getAll();
  return { code: 200, response };
};

module.exports = {
  getAll,
};