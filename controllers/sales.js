const salesService = require('../services/sales');
const saleSchema = require('../schemas/saleSchema');

const getAll = async (_req, res) => {
  const { code, data } = await salesService.getAll();
  return res.status(code).json(data);
};

const getById = async (req, res) => {
  const { code, data, message } = await salesService.getById(req.params.id);
  if (message) return res.status(code).json({ message });
  return res.status(code).json(data);
};

const create = async (req, res) => {
  const { error } = saleSchema.validate(req.body);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  const { code, data } = await salesService.create(req.body);
  return res.status(code).json(data);
};

const update = async (req, res, next) => {
  const { error } = saleSchema.validate(req.body);
  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  // chama service
  next();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
};