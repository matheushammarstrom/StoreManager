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
    console.log(error.message);
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }
  // chama service
};

const update = async (req, res) => {
  const { error } = saleSchema.validate(req.body);
  if (error) {
    console.log(error.message);
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