const express = require('express');
const { Router } = require('express')
const { controlersWeb } = require('../controllers/controlersWeb.js')

const routerWebServer = new Router();

routerWebServer.use(express.json())
routerWebServer.use(express.urlencoded({ extended: true }))

routerWebServer.get('/', controlersWeb.getProductos);
routerWebServer.get('/formulario', controlersWeb.sendFormulario);
routerWebServer.post('/', controlersWeb.postProducto);

module.exports = { routerWebServer }