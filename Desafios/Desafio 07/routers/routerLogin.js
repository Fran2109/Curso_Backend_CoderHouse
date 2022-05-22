import express, { Router } from "express";
import controllersLogin from "./../controllers/controllerLogin.js";

const routerLogin = new Router();

const { login, logout } = controllersLogin;

routerLogin.use(express.json())
routerLogin.use(express.urlencoded({ extended: true }))

routerLogin.post('/login', login);
routerLogin.post('/logout', logout);

export default routerLogin;