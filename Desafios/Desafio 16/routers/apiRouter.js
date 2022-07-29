import { Router } from 'express';
import apiControllers from '../controllers/apiControllers.js';
import authenticationController from '../controllers/authenticationController.js';
import { auth } from '../middlewares/middlewares.js';

const router = new Router()
const { 
    loginController, succesLogin, failureLogin,
    registerController, failureSignup, successSignup, 
    logout } = authenticationController;

const { getName, productosTest, getInfo, getNumbers } = apiControllers;
// Login
router.post('/login', loginController)
router.get('/successLogin', succesLogin)
router.get('/failureLogin', failureLogin)

//Signup
router.post('/signup', registerController);
router.get('/failureSignup', failureSignup)
router.get('/successSignup', successSignup)

//Logout
router.post('/logout', logout)

router.get('/login', getName);
router.get('/productos-test', auth, productosTest)
router.get('/getInfo', getInfo);
router.get('/randoms/:cant?', getNumbers);

export default router