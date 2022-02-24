const DB = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products ORDER BY id';
  const [result] = await DB.execute(query);
  console.log(result);
  return result;
};

module.exports = {
  getAll,
};