// import ProductService from "./dao/db/products.service.js";
// import CartService from "./dao/db/carts.service.js";
import UserService from "./dao/db/user.service.js";
import TicketService from './dao/db/tickets.service.js'

import ProductsRepository from "./repository/products.repository.js";
import CartsRepository from "./repository/carts.repository.js";
import UserRepository from "./repository/user.repository.js";
import TicketRepository from "./repository/tickets.repository.js";

import { cartServiceFact, productServiceFact } from "./factory.js";


const productsDao = productServiceFact
const cartsDao = cartServiceFact
const userDao = new UserService()
const ticketDao = new TicketService()


export const productService = new ProductsRepository(productsDao)
export const cartService = new CartsRepository(cartsDao)
export const userService = new UserRepository(userDao)
export const ticketService = new TicketRepository(ticketDao)



