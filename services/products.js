const productsModel = require('../models/products');

const getAll = async () => {
  const data = await productsModel.getAll();
  return { code: 200, data };
};

const getById = async (id) => {
  const [data] = await productsModel.getById(id);
  if (!data || data.length === 0) return { code: 404, message: 'Product not found' };
  return { code: 200, data };
};

const create = async (name, quantity) => {
  const data = await productsModel.getByName(name);
  if (data.length > 0) return { code: 409, message: 'Product already exists' };
  const { insertId } = await productsModel.create(name, quantity);
  return { code: 201, data: { name, quantity, id: insertId } };
};

module.exports = {
  getAll,
  getById,
  create,
};