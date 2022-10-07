import Service from "./service.js";
import productsRepository from './../repository/productsRepository.js';
import usersRepository from './../repository/usersRepository.js';
import cartsRepository from './../repository/cartsRepository.js';
import ordersRepository from './../repository/ordersRepository.js';
import messagesRepository from './../repository/messagesRepository.js';
import mailer from './../mail/mailer.js';
import { mailSender, mailSenderPassword, mailSenderHost, mailPort } from './../configs/config.js';

const repoProducts = new productsRepository();
const repoUsers = new usersRepository();
const repoCarts = new cartsRepository();
const repoOrders = new ordersRepository();
const repoMessages = new messagesRepository();
const mail = new mailer(mailSender, mailSenderPassword, mailSenderHost, mailPort);

const service = new Service(repoProducts, repoUsers, repoCarts, repoOrders, repoMessages, mail);

export default service;