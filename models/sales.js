const DB = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM sales.StoreManager ORDER BY id';
  const [result] = await DB.execute(query);

  return result;
};

module.exports = {
  getAll,
};