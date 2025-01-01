const productService = require('./product.services');

async function getProducts(req, res) {
  try {
    const products = await productService.fetchAllProducts();
    res.status(200).json(products)
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error retrieving products' }));
  }
}

async function createProduct(req, res) {
  try {
    const newProduct = await productService.addProduct(req.body);
    res.status(201).json(newProduct)
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error creating product' }));
  }
}

async function updateProduct(req, res) {
  try {
    const updateProduct = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json(updateProduct)
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error updating product' }));
  }
}

async function deleteProduct(req, res) {
  try {
    const deleteProduct = await productService.deleteProduct(req.params.id);
    res.status(200).json(deleteProduct)
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error deleting product' }));
  }
}

module.exports = { getProducts, createProduct , updateProduct, deleteProduct };