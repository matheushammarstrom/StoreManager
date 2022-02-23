const salesModel = require('../models/sales');

const getAll = async () => {
  const response = await salesModel.getAll();
  return { code: 200, response };
};

module.exports = {
  getAll,
};