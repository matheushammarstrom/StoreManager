const DB = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';
  const [result] = await DB.execute(query);
  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ? ORDER BY id';
  const [result] = await DB.execute(query, [id]);
  return result;
};

module.exports = {
  getAll,
  getById,
};