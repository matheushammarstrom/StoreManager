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

const getByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?';
  const [result] = await DB.execute(query, [name]);
  return result;
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)';
  const [result] = await DB.execute(query, [name, quantity]);
  return result;
};

const update = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET quantity=?,  name=? WHERE id=?';
  const [result] = await DB.execute(query, [quantity, name, id]);
  return result;
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id =?';
  const [result] = await DB.execute(query, [id]);
  console.log(result);
  return result;
};

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  deleteProduct,
};