const productsModel = require('../models/products');

const getAll = async () => {
  const data = await productsModel.getAll();
  return { code: 200, data };
};

module.exports = {
  getAll,
};