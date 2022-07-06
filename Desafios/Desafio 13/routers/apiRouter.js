import { Router } from 'express';
import apiControllers from '../controllers/apiControllers.js';
import authenticationController from '../controllers/authenticationController.js';

const router = new Router()
const { 
    loginController, succesLogin, failureLogin,
    registerController, failureSignup, successSignup, 
    logout } = authenticationController;

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

router.get('/productos-test', apiControllers.productosTest)
router.get('/login', apiControllers.getName);

export default router