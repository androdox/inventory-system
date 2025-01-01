const productServices = require('./product.services');
const productModel = require('./product.model');

// Mock de las funciones del modelo
jest.mock('./product.model', () => ({
  getAllProducts: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
}));

describe('Product Services', () => {
  describe('fetchAllProducts', () => {
    it('should fetch all products successfully', async () => {
      const mockProducts = [
        { id: 1, name: 'Product 1', price: 100 },
        { id: 2, name: 'Product 2', price: 200 },
      ];
      
      productModel.getAllProducts.mockResolvedValue(mockProducts);

      const result = await productServices.fetchAllProducts();
      expect(result).toEqual(mockProducts);
      expect(productModel.getAllProducts).toHaveBeenCalledTimes(1);
    });

    it('should throw an error if fetching products fails', async () => {
      productModel.getAllProducts.mockRejectedValue(new Error('Database error'));

      await expect(productServices.fetchAllProducts()).rejects.toThrow('Could not fetch products');
    });
  });

  describe('addProduct', () => {
    it('should add a product successfully', async () => {
      const newProduct = { name: 'Product 3', price: 300 };
      const createdProduct = { id: 3, ...newProduct };

      productModel.createProduct.mockResolvedValue(createdProduct);

      const result = await productServices.addProduct(newProduct);
      expect(result).toEqual(createdProduct);
      expect(productModel.createProduct).toHaveBeenCalledWith(newProduct);
    });

    it('should throw an error if adding a product fails', async () => {
      const newProduct = { name: 'Product 4', price: 400 };

      productModel.createProduct.mockRejectedValue(new Error('Database error'));

      await expect(productServices.addProduct(newProduct)).rejects.toThrow('Could not add product');
    });
  });

  describe('updateProduct', () => {
    it('should update a product successfully', async () => {
      const updatedData = { name: 'Updated Product', price: 150 };
      const updatedProduct = { id: 1, ...updatedData };

      productModel.updateProduct.mockResolvedValue(updatedProduct);

      const result = await productServices.updateProduct(1, updatedData);
      expect(result).toEqual(updatedProduct);
      expect(productModel.updateProduct).toHaveBeenCalledWith(1, updatedData);
    });

    it('should throw an error if updating a product fails', async () => {
      const updatedData = { name: 'Updated Product', price: 150 };

      productModel.updateProduct.mockRejectedValue(new Error('Database error'));

      await expect(productServices.updateProduct(1, updatedData)).rejects.toThrow('Could not update product');
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product successfully', async () => {
      const productId = 1;

      productModel.deleteProduct.mockResolvedValue({ id: productId });

      const result = await productServices.deleteProduct(productId);
      expect(result).toEqual({ id: productId });
      expect(productModel.deleteProduct).toHaveBeenCalledWith(productId);
    });

    it('should throw an error if deleting a product fails', async () => {
      const productId = 1;

      productModel.deleteProduct.mockRejectedValue(new Error('Database error'));

      await expect(productServices.deleteProduct(productId)).rejects.toThrow('Could not delete product');
    });
  });
});
