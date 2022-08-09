import { usersCollection, productsCollection, cartsCollection } from './../connections/mongoose.js';
import daoUsers from './../daos/daoUsers.js'
import daoProducts from './../daos/daoProducts.js'
import daoCarts from './../daos/daoCarts.js'
import mailer from './../mail/containerMailer.js'
import { mailSender, mailSenderPass } from './../configs/config.js'

const users = new daoUsers(usersCollection);
const products = new daoProducts(productsCollection);
const carts = new daoCarts(cartsCollection);
const mail = new mailer(mailSender, mailSenderPass);

export { 
    users,
    products,
    carts,
    mail
};