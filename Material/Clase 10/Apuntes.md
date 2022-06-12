# Clase 10
## MERN
+ **MongoDB** es un base de datos NoSQL que está orientada a documentos. 
+ **Express** es una infraestructura de aplicaciones web Node.js 
+ **React JS** es una biblioteca para crear componentes de interfaz de usuario.
+ **Node.js** es un entorno de ejecución para JavaScript que puede permitirle ejecutar JavaScript fuera del navegador, por ejemplo del lado servidor.
## Mongoose
### ¿Qué es Mongoose?
+ Mongoose es una dependencia Javascript que realiza la conexión a la instancia de MongoDB
+ Pero la magia real del módulo Mongoose es la habilidad para definir un esquema del documento. 
+ MongoDB usa colecciones para almacenar múltiples documentos, los cuales no necesitan tener la misma estructura.
+ Cuando tratamos con objetos es necesario que los documentos sean algo parecido. En este punto nos ayudan los esquemas y modelos de Mongoose.
### Schema y Model
+ Mongoose usa un objeto Schema para definir una lista de propiedades del documento, cada una con su propio tipo y características para forzar la estructura del documento. 
+ Después de especificar un esquema deberemos definir un Modelo constructor para así poder crear instancias de los documentos de MongoDB
### Validaciones
+ Mongoose es un Object Document Mapper (ODM). Esto significa que permite definir objetos con un esquema fuertemente tipado que se asigna a un documento MongoDB.
+ Mongoose proporciona una amplia cantidad de funcionalidades para crear y trabajar con esquemas.
### SchemaTypes
1. String (Cadena)
2. Number (Número)
3. Date (Fecha)
4. Buffer
5. Boolean (Booleano)
6. Mixed (Mixto)
7. ObjectId
8. Array (Matriz)
### Configuración del proyecto: pasos a seguir
1. Creamos un proyecto Node.js con npm init -y
2. Instalamos la dependencia mongoose con npm i mongoose
3. Describimos nuestro modelo de datos ( Schema + Model ) con las validaciones necesarias.
4. Levantamos el motor de base de datos MongoDB.
5. Creamos la función de conexión mediante mongoose, con las opciones configuradas.
6. Con mongoose realizamos las operaciones CRUD hacia MongoDB: Read, Create, Update y Delete.
7. Mostramos consultas con distintos filtros de Query y con el uso de projection, funciones sort, limit y skip