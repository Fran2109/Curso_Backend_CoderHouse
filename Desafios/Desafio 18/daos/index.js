import { usersCollection, productsCollection, cartsCollection } from './../connections/mongoose.js';
import daoUsers from './../daos/daoUsers.js'
import daoProducts from './../daos/daoProducts.js'
import daoCarts from './../daos/daoCarts.js'

const users = new daoUsers(usersCollection);
const products = new daoProducts(productsCollection);
const carts = new daoCarts(cartsCollection);

export { 
    users,
    products,
    carts
};