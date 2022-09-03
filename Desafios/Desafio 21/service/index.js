import Service from "./service.js";
import productsRepository from './../repository/productsRepository.js';
import messagesRepository from './../repository/messagesRepository.js';
import usersRepository from './../repository/usersRepository.js';

const repoProducts = new productsRepository();
const repoMessages = new messagesRepository();
const repoUsers = new usersRepository();

const service = new Service(repoProducts, repoMessages, repoUsers);

export default service;