const express = require('express');
const { Router } = require('express')
const { ControlersApi } = require('../Controllers/ControlersApi.js')

const routerApiProductos = new Router();

routerApiProductos.use(express.json())
routerApiProductos.use(express.urlencoded({ extended: true }))

routerApiProductos.get('/', ControlersApi.getProductos);
routerApiProductos.get('/:id', ControlersApi.getProducto);
routerApiProductos.post('/', ControlersApi.postProducto);
routerApiProductos.put('/:id', ControlersApi.putProducto);
routerApiProductos.delete('/:id', ControlersApi.deleteProducto);

module.exports = { routerApiProductos }