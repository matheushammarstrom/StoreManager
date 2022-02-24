const productsModel = require('../models/products');

const getAll = async () => {
  const data = await productsModel.getAll();
  return { code: 200, data };
};

const getById = async (id) => {
  const [data] = await productsModel.getById(id);
  if (!data || data.length === 0) return { code: 404, message: 'Product not found' };
  return { code: 200, data };
};

module.exports = {
  getAll,
  getById,
};