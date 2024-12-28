const productModel = require('./product.model');

async function fetchAllProducts() {
  try {
    const result = await productModel.getAllProducts();
    return result.rows;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw new Error('Could not fetch products');
  }
}

async function addProduct(data) {
  try {
    const result = await productModel.createProduct(data);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding product:', error.message);
    throw new Error('Could not add product');
  }
}

module.exports = { fetchAllProducts, addProduct };