const DB = require('./connection');

const getAll = async () => {
  const query = `SELECT product_id, date, sale_id, quantity FROM StoreManager.sales as s
  JOIN StoreManager.sales_products as sp
  ON s.id =  sp.sale_id
  ORDER BY sale_Id`;
  const [result] = await DB.execute(query);

  return result;
};

const getById = async (id) => {
  const query = `SELECT product_id, date, sale_id, quantity FROM StoreManager.sales as s
  JOIN StoreManager.sales_products as sp
  ON s.id =  sp.sale_id
  WHERE sp.sale_id = ?`;
  const [result] = await DB.execute(query, [id]);
  return result;
};
module.exports = {
  getAll,
  getById,
};