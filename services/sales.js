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

const create = async (data) => {
  const arraySales = [];
  const { insertId } = await salesModel.createSales();
  data.forEach(async (sale) => {
    const salePromise = salesModel.createSalesProducts(insertId, sale.productId, sale.quantity);
    arraySales.push(salePromise);
  });
  Promise.all(arraySales);
  return { 
    code: 201,
    data: {
    id: 1, 
    itemsSold: data,
  } };
};

module.exports = {
  getAll,
  getById,
  create,
};