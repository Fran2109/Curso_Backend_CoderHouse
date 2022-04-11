console.log("Desafio 01");

class Producto{
    constructor(id, title, price, description)
    {
        this.id = id;
        this.title = title;
        this.price = price;
        this.description = description;
    }
}

class Contenedor {
    constructor(){
        this.objectArray = [];
    }
    save(producto){
        this.objectArray.push(producto);
    }
    getById(id){
        return this.objectArray.find(producto => producto.id == id);
    }
    getAll(){
        return this.objectArray;
    }
    deleteById(id){
        this.objectArray = this.objectArray.filter(producto => producto.id != id);
    }
    deleteAll(){
        this.objectArray = [];
    }
}

const carrito = new Contenedor();

const producto1 = new Producto(1, "Polenta", "250$", "Polenta no se pasa");

console.log(producto1);

console.log(carrito);

carrito.save(producto1);

console.log(carrito);

const producto2 = new Producto(2, "Fideos", "350$", "Fideos Marolio");

const producto3 = new Producto(3, "Hamburguesas", "150$", "Hamburguesas de carne");

const producto4 = new Producto(4, "Queso", "180$", "Queso de Vaca");

carrito.save(producto2);    carrito.save(producto3);    carrito.save(producto4);

console.log(carrito);

let result = carrito.getById(2);

console.log(result);

carrito.deleteById(1);

console.log(carrito);

let arrayCarrito = carrito.getAll();

console.log(arrayCarrito);

carrito.deleteAll();

console.log(carrito);