const productsService = require('../services/products');
const productSchema = require('../schemas/productSchema');

const getAll = async (_req, res) => {
  const { code, data } = await productsService.getAll();
  return res.status(code).json(data);
};

const getById = async (req, res) => {
  const { code, data, message } = await productsService.getById(req.params.id);
  if (message) return res.status(code).json({ message });
  return res.status(code).json(data);
};

const create = async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  const { code, data, message } = await productsService.create(req.body.name, req.body.quantity);
  if (message) return res.status(code).json({ message });
  return res.status(code).json(data);
};

const update = async (req, res) => {
  const { error } = productSchema.validate(req.body);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  // chama service
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};