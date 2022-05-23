import express, { Router } from 'express';
import controllerCarritos from './../controllers/controllerCarritos.js';

const routerCarritos = new Router();

const { postCarrito, postProductoCarrito, getProductosCarrito, deleteProductoCarrito, deleteProductosCarrito } = controllerCarritos;

routerCarritos.post('/', postCarrito);
routerCarritos.post('/:id_carrito/productos', postProductoCarrito);
routerCarritos.get('/:id_carrito/productos', getProductosCarrito);
routerCarritos.delete('/:id_carrito/productos/:id_producto', deleteProductoCarrito);
routerCarritos.delete('/:id_carrito', deleteProductosCarrito);

export default routerCarritos;