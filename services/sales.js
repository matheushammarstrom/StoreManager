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

module.exports = {
  getAll,
};