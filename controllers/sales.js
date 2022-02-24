const salesService = require('../services/sales');

const getAll = async (_req, res) => {
  const { code, data } = await salesService.getAll();
  return res.status(code).json(data);
};

const getById = async (req, res) => {
  const { code, data, message } = await salesService.getById(req.params.id);
  if (message) return res.status(code).json({ message });
  return res.status(code).json(data);
};

module.exports = {
  getAll,
  getById,
};