export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }
    createTicket = (sumCart, userEmail) => {
        return this.dao.createTicket(sumCart, userEmail);
    }
  
   
};