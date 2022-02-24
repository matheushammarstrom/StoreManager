const salesService = require('../services/sales');

const getAll = async (_req, res) => {
  const { code, data } = await salesService.getAll();
  return res.status(code).json(data);
};

module.exports = {
  getAll,
};