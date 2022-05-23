import contenedor from "../classes/contenedor.js";
import fetch from "node-fetch";

const carritos = new contenedor("./data/carritos.txt");
const productos = new contenedor("./data/productos.txt");

const controlerCarritos = {
    postCarrito: async (req, res) => {
        const carrito = {
            productos: []
        }
        carritos.save(carrito);
        res.json(carrito);
    },
    postProductoCarrito: async (req, res) => {
        const carritoID = req.params.id_carrito;
        const productoID = req.body.id;
        const carritoBuscado = await carritos.getById(carritoID);
        if(!carritoBuscado.productos.includes(productoID)){
            carritoBuscado.productos.push(productoID);
            carritos.updateById(carritoID, carritoBuscado);
        }
        res.json(carritoBuscado);
    },
    getProductosCarrito: async (req, res) => {
        const carritoID = req.params.id_carrito;
        const carritoBuscado = await carritos.getById(carritoID);
        const productosCarrito = [];
        /* for await (const productoID of carritoBuscado.productos){
            await fetch(`http://localhost:8080/api/productos/${productoID}`).
            then(response => response.json()).
            then(producto => {
                productosCarrito.push(producto);
            });
        } */ //Version de prueba local. No funcionaria para glitch porque no sabria cual es el puerto de la api ni la dirreccion.
        for await (const productoID of carritoBuscado.productos){
            const producto = await productos.getById(productoID);
            productosCarrito.push(producto);
        }
        res.json(productosCarrito);
    },
    deleteProductoCarrito: async (req, res) => {
        const carritoID = req.params.id_carrito;
        const productoID = req.params.id_producto;
        const carritoBuscado = await carritos.getById(carritoID);
        if(carritoBuscado.productos.includes(productoID)){
            carritoBuscado.productos = carritoBuscado.productos.filter(producto => producto !== productoID);
            carritos.updateById(carritoID, carritoBuscado);
        }
        res.json(carritoBuscado);
    },
    deleteProductosCarrito: async (req, res) => {
        const carritoID = req.params.id_carrito;
        const carritoBuscado = await carritos.getById(carritoID);
        carritoBuscado.productos = [];
        carritos.updateById(carritoID, carritoBuscado);
        res.json(carritoBuscado);
    }
}

export default controlerCarritos;