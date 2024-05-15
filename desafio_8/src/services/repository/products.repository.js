export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getProducts = () => {
        return this.dao.getProducts();
    }
    addProduct = (product) => {
        return this.dao.addProduct(product);
    }
    deleteProduct = (itemId) => {
        return this.dao.deleteProduct(itemId);
    }
    updateProduct = (prodId, product) => {
        return this.dao.updateProduct(prodId, product);
    }
    getProductsById = (itemId) => {
        return this.dao.getProductsById(itemId);
    }
    updateProductStock = (prodId, newStock) => {
        return this.dao.updateProductStock(prodId, newStock);
    }
};