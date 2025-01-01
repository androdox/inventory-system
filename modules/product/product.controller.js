const productService = require('./product.services');

async function getProducts(req, res) {
  try {
    const products = await productService.fetchAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error retrieving products:', error.message);
    res.status(500).json({
      error: {
        code: 500,
        message: 'Error retrieving products',
        details: error.message,
      },
    });
  }
}

async function createProduct(req, res) {
  try {
    if (!req.body.name || !req.body.price || !req.body.quantity) {
      return res.status(400).json({
        error: {
          code: 400,
          message: 'Missing required fields: name, price, and quantity are mandatory',
        },
      });
    }

    const newProduct = await productService.addProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error.message);
    res.status(500).json({
      error: {
        code: 500,
        message: 'Error creating product',
        details: error.message,
      },
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const productData = req.body;

    if (!id) {
      return res.status(400).json({
        error: {
          code: 400,
          message: 'Product ID is required in the URL parameter',
        },
      });
    }

    const updatedProduct = await productService.updateProduct(id, productData);
    if (!updatedProduct) {
      return res.status(404).json({
        error: {
          code: 404,
          message: `Product with ID ${id} not found`,
        },
      });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({
      error: {
        code: 500,
        message: 'Error updating product',
        details: error.message,
      },
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: {
          code: 400,
          message: 'Product ID is required in the URL parameter',
        },
      });
    }

    const deletedProduct = await productService.deleteProduct(id);
    if (!deletedProduct) {
      return res.status(404).json({
        error: {
          code: 404,
          message: `Product with ID ${id} not found`,
        },
      });
    }

    res.status(200).json({ message: `Product with ID ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({
      error: {
        code: 500,
        message: 'Error deleting product',
        details: error.message,
      },
    });
  }
}

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };