const productsService = require('../services/products');

const getAll = async (_req, res) => {
  const { code, data } = await productsService.getAll();
  return res.status(code).json(data);
};

module.exports = {
  getAll,
};