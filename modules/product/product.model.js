const db = require('../../db'); // Conexión a la base de datos

async function createProduct({ name, description, price, quantity }) {
  return await db.query(
    'INSERT INTO products (name, description, price, quantity) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, price, quantity]
  );
}

async function getAllProducts() {
  return await db.query('SELECT id, name, description, price, quantity FROM products');
}

async function getProductById(id) {
  return await db.query('SELECT id, name, description, price, quantity FROM products WHERE id = $1', [id]);
}

async function updateProduct(id, { name, description, price, quantity }) {
  return await db.query(
    'UPDATE products SET name = $1, description = $2, price = $3, quantity = $4 WHERE id = $5 RETURNING *',
    [name, description, price, quantity, id]
  );
}

async function deleteProduct(id) {
  return await db.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};