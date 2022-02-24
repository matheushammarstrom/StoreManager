const productsService = require('../services/products');

const getAll = async (_req, res) => {
  const { code, data } = await productsService.getAll();
  return res.status(code).json(data);
};

const getById = async (req, res) => {
  const { code, data, message } = await productsService.getById(req.params.id);
  if (message) return res.status(code).json(message);
  return res.status(code).json(data);
};

module.exports = {
  getAll,
  getById,
};