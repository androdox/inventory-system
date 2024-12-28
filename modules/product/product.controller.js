const productService = require('./product.services');

async function getProducts(req, res) {
  try {
    const products = await productService.fetchAllProducts();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error retrieving products' }));
  }
}

async function createProduct(req, res) {
  try {
    const newProduct = await productService.addProduct(req.body);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newProduct));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Error creating product' }));
  }
}

module.exports = { getProducts, createProduct };