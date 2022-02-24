const salesModel = require('../models/sales');

const getAll = async () => {
  const data = await salesModel.getAll();
  return { code: 200, data };
};

module.exports = {
  getAll,
};