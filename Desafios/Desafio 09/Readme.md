# Desafio 09
## Creacion
~~~
use ecommerce
~~~
### Productos
#### Tabla
~~~
db.createCollection("productos")
~~~
#### Registros
~~~
db.productos.insertMany( [ 
    { "title": "Casa1", "price": 500, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/school_building_education_high-256.png" },
    { "title": "Casa2", "price": 1000, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/school_building_education_high-256.png" },
    { "title": "Casa3", "price": 1500, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/school_building_education_high-256.png" },
    { "title": "Casa4", "price": 2000, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/school_building_education_high-256.png" },
    { "title": "Casa5", "price": 2500, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/school_building_education_high-256.png" },
    { "title": "Casa6", "price": 3000, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/school_building_education_high-256.png" },
    { "title": "Casa7", "price": 3500, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/school_building_education_high-256.png" },
    { "title": "Casa8", "price": 4000, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/school_building_education_high-256.png" },
    { "title": "Casa9", "price": 4500, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/school_building_education_high-256.png" },
    { "title": "Casa10", "price": 5000, "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/school_building_education_high-256.png" }
] )
~~~
### Mensajes
#### Tabla
~~~
db.createCollection("mensajes")
~~~
#### Registros
~~~
db.mensajes.insertMany( [
    { "email": "franciscofilosi1@gmail.com", "mensaje": "hola1", "fechaString": "2022/6/3 10:53:33" },
    { "email": "franciscofilosi2@gmail.com", "mensaje": "hola2", "fechaString": "2022/6/3 10:53:33" },
    { "email": "franciscofilosi3@gmail.com", "mensaje": "hola3", "fechaString": "2022/6/3 10:53:33" },
    { "email": "franciscofilosi4@gmail.com", "mensaje": "hola4", "fechaString": "2022/6/3 10:53:33" },
    { "email": "franciscofilosi5@gmail.com", "mensaje": "hola5", "fechaString": "2022/6/3 10:53:33" },
    { "email": "franciscofilosi6@gmail.com", "mensaje": "hola6", "fechaString": "2022/6/3 10:53:33" },
    { "email": "franciscofilosi7@gmail.com", "mensaje": "hola7", "fechaString": "2022/6/3 10:53:33" },
    { "email": "franciscofilosi8@gmail.com", "mensaje": "hola8", "fechaString": "2022/6/3 10:53:33" },
    { "email": "franciscofilosi9@gmail.com", "mensaje": "hola9", "fechaString": "2022/6/3 10:53:33" },
    { "email": "franciscofilosi10@gmail.com", "mensaje": "hola10", "fechaString": "2022/6/3 10:53:33"},
] )
~~~
## Listar
### Productos
~~~
db.productos.find()
~~~
### Mensajes
~~~
db.mensajes.find()
~~~
## Contar
### Productos
~~~
db.productos.estimatedDocumentCount()
~~~
### Mensajes
~~~
db.mensajes.estimatedDocumentCount()
~~~
## CRUD
### Create
~~~
db.productos.insertOne({ "title": "CasaAgregada", "price": "5500", "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/school_building_education_high-256.png" })
~~~
### Read
~~~
db.productos.find({"price": {$lt: 1000}})
db.productos.find({$and: [{"price": {$gte: 1000}},{"price": {$lte: 3000}}]})
db.productos.find({"price": {$gt: 3000}})
db.productos.find({}, {"title": 1, "_id": 0}).skip(2).limit(1).sort({price: 1}).pretty()
~~~
### Update
~~~
db.productos.updateMany({},{$set: {"stock": 100}})
db.productos.updateMany({"price": {$gt: 4000}},{$set: {"stock": 0}})
~~~
### Delete
~~~
db.productos.deleteMany({"price": {$lt: 1000}})
~~~
## Usuario
### Admin
~~~
use admin
~~~
### Creo usuario
~~~
db.createUser({user: "pepe", pwd: "asd456", roles: [ { role: "read", db: "ecommerce" } ] })
~~~
### Accedo al usuario
~~~
mongo -u pepe -p asd456
use ecommerce
~~~
### Pruebas
#### Permitidas
~~~
db.productos.find()
db.productos.find({$and: [{"price": {$gte: 1000}},{"price": {$lte: 3000}}]})
~~~
#### No Permitidas
~~~
db.productos.insertOne({ "title": "CasaAgregada", "price": "5500", "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-science-vol-1-1/512/school_building_education_high-256.png" })
db.productos.deleteMany({})
~~~