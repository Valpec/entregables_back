export default class CartsRepository {
    constructor(dao) {
        this.dao = dao;
    }
    readCartFile = () => {
        return this.dao.readCartFile();
    }
    createCart = () => {
        return this.dao.createCart();
    }
    listCartProds = (cartId) => {
        return this.dao.listCartProds(cartId);
    }
    addToCart = (cartId, prodId) => {
        return this.dao.addToCart(cartId, prodId);
    }
    deleteCart = (cartId) => {
        return this.dao.deleteCart(cartId);
    }
    deleteProdFromCart = (cartId, prodId) => {
        return this.dao.deleteProdFromCart(cartId, prodId);
    }
    updateCartQty = (cartId, prodId, qty) => {
        return this.dao.updateCartQty(cartId, prodId, qty);
    }
    updateCart = (cartId) => {
        return this.dao.updateCart(cartId);
    }
    
};