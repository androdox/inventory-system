const productModel = require('./product.model');

async function fetchAllProducts() {
  try {
    const result = await productModel.getAllProducts();
    return result;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw new Error('Could not fetch products');
  }
}

async function addProduct(data) {
  try {
    const result = await productModel.createProduct(data);
    return result;
  } catch (error) {
    console.error('Error adding product:', error.message);
    throw new Error('Could not add product');
  }
}

async function updateProduct(id, data) {
  try {
    const result = await productModel.updateProduct(id, data);
    return result;
  } catch (error) {
    console.error('Error updating product:', error.message);
    throw new Error('Could not update product');
  }
}

async function deleteProduct(id) {
  try {
    const result = await productModel.deleteProduct(id);
    return result;
  } catch (error) {
    console.error('Error deleting product:', error.message);
    throw new Error('Could not delete product');
  }
}
module.exports = { fetchAllProducts, addProduct, updateProduct, deleteProduct };