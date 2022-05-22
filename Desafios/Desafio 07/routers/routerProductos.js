import express, { Router } from "express";
import controlerProductos from "../controllers/controllerProductos.js";
import { soloParaAdmins } from "../middlewares/admin.js";
const routerProductos = new Router();

const { getProductos, getProducto, deleteProducto } = controlerProductos;

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))

routerProductos.get('/', getProductos);
routerProductos.get('/:id', getProducto);
//routerProductos.post('/', );
//routerProductos.put('/:id', );
routerProductos.delete('/:id',soloParaAdmins, deleteProducto);

export default routerProductos;