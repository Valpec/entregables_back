export default class UserRepository {
    constructor(dao) {
        this.dao = dao;
    }
    registerUser = (userData) => {
        return this.dao.registerUser(userData);
    }
    loginUser = (userData, request) => {
        return this.dao.loginUser(userData, request);
    }
   
};