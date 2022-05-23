import express, { Router } from "express";
import controlerProductos from "../controllers/controllerProductos.js";
import { soloParaAdmins } from "../middlewares/admin.js";
import archivos from "../middlewares/archivos.js";

const routerProductos = new Router();

const { getProductos, getProducto, postProducto, putProducto, deleteProducto } = controlerProductos;
const { middlewareDeUnArchivo } = archivos;

routerProductos.get('/', getProductos);
routerProductos.get('/:id', getProducto);
routerProductos.post('/', soloParaAdmins, middlewareDeUnArchivo, postProducto);
routerProductos.put('/:id', soloParaAdmins, middlewareDeUnArchivo, putProducto);
routerProductos.delete('/:id', soloParaAdmins, deleteProducto);

export default routerProductos;