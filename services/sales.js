const salesModel = require('../models/sales');

const getAll = async () => {
  const modelResponse = await salesModel.getAll();
  const data = modelResponse.map((sale) => ({
      saleId: sale.sale_id,
      productId: sale.product_id,
      quantity: sale.quantity,
      date: sale.date,
    }));
  return { code: 200, data };
};

const getById = async (id) => {
  const modelResponse = await salesModel.getById(id);
  if (!modelResponse || modelResponse.length === 0) return { code: 404, message: 'Sale not found' };
  const data = modelResponse.map((el) => ({
      productId: el.product_id,
      quantity: el.quantity,
      date: el.date })); 
  
  return { code: 200, data };
};

module.exports = {
  getAll,
  getById,
};