export default class ProductsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    getProducts = () => {
        return this.dao.getProducts();
    }
    addProduct = (product, email) => {
        return this.dao.addProduct(product, email);
    }
    deleteProduct = (itemId, email) => {
        return this.dao.deleteProduct(itemId, email);
    }
    updateProduct = (prodId, product, email) => {
        return this.dao.updateProduct(prodId, product, email);
    }
    getProductsById = (itemId) => {
        return this.dao.getProductsById(itemId);
    }
    updateProductStock = (prodId, newStock) => {
        return this.dao.updateProductStock(prodId, newStock);
    }
};