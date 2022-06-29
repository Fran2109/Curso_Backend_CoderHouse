# Clase 12
## COOKIES
### ¿Qué son las Cookies?
Las Cookies son archivos que podemos guardar del lado del cliente, en el navegador del usuario.
### Características
* A las cookies se les puede configurar un tiempo de vida. Una vez finalizado el mismo, la cookie se elimina del navegador.
* Al almacenarse del lado del cliente, el espacio con el que se cuenta es limitado, por lo que se recomienda elegir de forma adecuada lo que se vaya a guardar como cookie.
* Hay que recordar que no se deben almacenar datos sensibles en las cookies.
### Empezando a usar cookies
Primero hay que instalar el paquete de cookie parser para poder utilizarlas: ```npm i cookie-parser --save```
Hay que requerirlo e incluirlo en la aplicación en la que se lo va a utilizar. Es un middleware que se requiere a nivel de aplicación.
```JavaScript
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())
```
### Crear una cookie
* En la ruta /set se crea una cookie de nombre “server” y valor “express”. La misma no tiene un tiempo de vida límite.
* En la ruta /setEX se crea una cookie de nombre “server2” y valor “express”. En esta, se le seteó un tiempo de vida máximo de 30 segundos.
```JavaScript
app.get('/set', (req, res) => {
    res.cookie('server', 'express').send('Cookie Set')
})

app.get('/setEX', (req, res) => {
    res.cookie('server2', 'express2',{ maxAge: 30000}).send('Cookie SetEx')
})
```
### Leer una cookie
Se utiliza el parámetro de request, y el nombre asignado a la cookie que se quiere leer.
```JavaScript
app.get('/get', (req, res) => {
    res.send(req.cookies.server)
})
```
### Borrar una cookie
Para eliminar una cookie, se utiliza el parámetro response y el método clearCookie. El parámetro que se le pasa al método es el nombre de la cookie que se desea borrar.
```JavaScript
app.get('/clr', (req, res) => {
    res.clearCookie('server').send('Cookie Clear')
})
```
## SIGNED COOKIES
### Características
* A las cookies se les puede agregar un mecanismo de validación que consiste en adjuntar a cada cookie una versión encriptada de su contenido.
* Dicha encriptación se realiza mediante una palabra clave o “secreto” definido del lado del servidor, y desconocido por los clientes.
* El servidor es capaz de verificar si la cookie que se recibe desde el cliente ha sido adulterada o no, chequeando contra la versión encriptada.
### cookieParser(secret)
Secret: string o array de strings que se utiliza para firmar las cookies enviadas, y para analizar las recibidas.
* Es opcional y, si no se especifica, no firmará ni analizará las cookies recibidas.
* Si es un string, se utiliza como secret. Si es un array de strings, se firmará la cookie con cada string en el orden provisto (y lo mismo al analizar)
### Crear una cookie firmada
* Para firmar una cookie antes de enviarla al cliente, solo basta con agregar a los dos argumentos usuales (nombre y valor), un tercer argumento de tipo objeto (como se hizo para setear la expiración) con la propiedad “signed” en true. ```{ signed: true }```
* Las cookies firmadas recibidas, que hayan pasado la verificación de su firma, ya no se encontrarán en req.cookies, sino que aparecerán en req.signedCookies. Aquellas que no hayan pasado la verificación, no aparecerán, como si no existieran.
## SESSION MEMORY
### ¿Qué es Session?
Session es un paquete de Node, el cual permite que una variable sea accesible desde cualquier lugar del sitio. Se almacena del lado del servidor.
### Características
* La información que se quiera guardar en session se almacena del lado del servidor.
* Del lado del cliente, se crea un identificador único para poder acceder a esa información desde el navegador.
* Los datos almacenados en session se borran al cerrar la ventana del navegador.
* Se utiliza principalmente para guardar los datos de usuario al iniciar sesión.
### Empezando a usar session
Se debe instalar el módulo de express-session para empezar a utilizar session: ```npm i express-session --save```
Tiene que ser requerido e incluido en la aplicación en la que se lo va a utilizar.
Es un middleware que se requiere a nivel de aplicación.
```JavaScript
const express = requiere("express")
const session = requiere("express-session")
const app = express()

const port = process.env.port || 3000

app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}))
```
### Guardar datos en session
```JavaScript
app.get('/con-session', (req, res) => {
    if(req.session.contador) {
        req.session.contador++
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`)
    } else {
        req.session.contador = 1
        res.send('Bienvenido!')
    }
})
```
* En el else se crea la variable en session llamada “contador” la cual tiene inicialmente un valor de 1.
* En el if, si ya existe esta variable en session, se aumenta su valor en 1.
* Tener en cuenta que tanto para inicializar una nueva variable en session como para leer los datos de la misma se utiliza el parámetro de request.
### Eliminar datos de session
```JavaScript
app.get('/logout', (req, res) => {
    req.session.destroy( err => {
        if(!err) res.send('Logout Ok!)
        else res.send({status: "Logout ERROR", body:err})
    })
})
```
Para eliminar datos de una variable de session, se utiliza el parámetro de request y el método destroy. Como parámetro se pasa un callback.
### Login con session
```JavaScript
app.get('/login', (req, res) => {
    const { username, password } = req.query
    if(username !== "pepe" || password !== "pepepass"){
        return res.send('login failed')
    }
    req.session.user = username
    req.session.admin = true
    res.send('login succes!')
})
```
Para iniciar sesión se verifica que los datos ingresados por el usuario sean los correctos. Si lo es, se guarda en session los datos de este usuario. Además, se puede crear la variable admin, también en session, con el valor de true, lo que indica que el usuario logueado es un administrador
### Middleware de autenticación
```JavaScript
function auth(req, res, next) {
    if(req.session?.user === "pepe" && req.session?.admin){
        return next()
    }
    return res.status(401).send('error de autorizacion!')
}
```
Mediante estos middleware se puede limitar el acceso a determinadas rutas a aquellos usuarios que sean administradores (o, por ejemplo, otras a cualquier usuario logueado).
Si coincide el usuario guardado en session y además es admin, entonces sigue a la ruta, sino devuelve un error.
### Aplicación del middleware
```JavaScript
app.get('/privado', auth, (req, res) => {
    res.send('si estas viendo esto es porque ya te logueaste!')
})
```
Al aplicar el auth middleware en la ruta /content, estará accesible únicamente luego de que el usuario haya iniciado sesión.
Además, según el código del middleware, se puede especificar a cierto usuario o cierto tipo de usuario (admin o usuario común, por ejemplo)
### Logout con session
```JavaScript
app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.json({ status: 'Logout ERROR', body: err })
        }
        res.send('Logout ok!')
    })
})
```
Para cerrar sesión, solo basta con aplicar el método destroy de session.
Al borrar los datos almacenados, ya no queda registro de que el usuario haya iniciado sesión. Y en este caso, ya no van a ser accesibles las rutas que tengan el auth middleware.
## SESSION MEMORYSTORE
### ¿Qué es y cómo se utiliza el memoryStore ?
* Cuando nos manejamos con session-memory, de forma predeterminada estaremos utilizando el almacenamiento en memoria: el memoryStore.
* Al reiniciar el servidor, estos datos se borran, de modo que no tienen persistencia. Por eso, memoryStore solo está disponible en desarrollo (nunca en producción).
>> Para superar esta limitación utilizaremos Session FileStore.
## SESSION FILESTORE
### ¿Qué es y cómo se utiliza el fileStore ?
* Se utiliza igual que memoryStore, con la diferencia de que se crea una carpeta de archivos en donde se almacenan los datos de session.
* Estos tendrán persistencia, ya que quedarán guardados en el servidor.
### Empezando a usar fileStore
Además de tener instalado el express-session habrá que instalar session-file-store: ```npm install session-file-store --save```
```JavaScript
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
/* Persistencia por file store */
const FileStore = require('session-file-store')(session)
```
### Usando fileStore
```JavaScript
const app = express()
app.use(cookieParser())
app.use(session({
    store: new FileStore({path: '../sesiones', ttl:300, retries: 0}),
    secret: 'shhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 40000
    }
}))
```
Se incluye session como middleware a nivel aplicación. Pero se agrega la clave store en 
el objeto
El path especificado es la ubicación y nombre de la carpeta que se crea.
👉 Se aplica req.session en las rutas deseadas, de la misma forma ya vista anteriormente.
### Carpeta de archivos
Una vez que se ejecuta el código y se guardan datos en req.session, se crea la carpeta con un archivo .json.
```JavaScript
{
    "cookie": {
        "originalMaxAge": null,
        "expires": null,
        "httpOnly": true,
        "path": "/"
    },
    "contador": 5,
    "__lastAccess": 1617753734522
}
```
## SESSION REDIS
### ¿Qué es Redis?
* Es un servidor de diccionarios remoto (Remote Dictionary Server).
* Almacén de datos clave-valor en memoria de código abierto que se puede utilizar como base de datos, caché y agente de mensajes.
### Contar con Redis
* Se debe [descargar](https://redis.io/download/) el archivo comprimido y luego agregar la ruta de la carpeta al PATH del sistema.
* Para iniciar el servidor de Redis, en consola: redis-server
### Características
* Los datos de Redis se almacenan en memoria del servidor, por lo que el acceso a los mismos es muy rápido.
* Tiene mucha flexibilidad en cuanto a las estructuras de datos que admite (strings, listas, hashes, sets, entre otros). De esta forma, el código queda mucho más simple y con menos líneas.
* Por persistencia, Redis admite copias de seguridad puntuales (guarda el conjunto de datos en el disco).
* Crea soluciones con un alto nivel de disponibilidad, lo que ofrece fiabilidad y rendimiento estables.
### Comando Keys
* Las Redis Keys son binarias y seguras. Esto significa que puede usar cualquier secuencia binaria como clave, ya sea un string o un archivo de imagen.
* El tipo más usado y recomendado por su mayor simpleza es un string como Redis Keys.
* Con el uso de los comandos SET y GET configuramos y recuperamos un valor de un string.
### SET key value
* Es el comando con el que se pueden setear nuevos key value.
* Se le puede especificar un tiempo de expiración en segundos o milisegundos.
* Da como respuesta “OK” si el comando SET se ejecutó correctamente y, si hubo algún problema, devuelve “Null”.
### GET key value
* Es el comando con el que se puede leer el valor de la key.
* Devuelve un error si el valor de la key es distinto de un string.
* Si se ejecuta correctamente devuelve el valor de la key. Si esta no existe, devuelve la palabra reservada nil.
### TTL key
* Devuelve el tiempo de vida que le queda a la key, si es que tiene seteado un timeout.
* Permite al cliente chequear por cuánto tiempo más esa key va a ser parte del conjunto de datos.
* Devuelve -1 si la key no existe o no tiene un tiempo de expiración.
### Empezando a usar Redis
Además de instalar express-session, se deben instalar las dependencias 
redis y connect-redis: ```npm install redis connect-redis --save```
```JavaScript
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const redis = require('redis')
const client = redis.createClient()
const RedisStore = require('connect-redis')(session)
```
👉 Desde el [link de github](https://github.com/microsoftarchive/redis/releases) en pantalla es posible descargar la carpeta con los datos necesarios para crear una Redis local como persistencia de los datos.
### Usando Redis
Se agrega en el app.use de session otra clave al objeto llamada store, similar a sessionFile.
Luego, se utiliza en las rutas y controladores de la misma forma que lo ya visto en sessionMemory.
```JavaScript
const app = express()
app.use(cookieParser())
app.use(session({
    store: new RedisStore({
        host: 'localhost',
        port: 6379,
        client: client,
        ttl: 300
    }),
    secret: 'shhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 50000
    }
}))
```
## REDISLAB
### ¿De qué se trata?
* RedisLab es lo mismo que Redis, pero los datos se guardan en la nube.
* Entrando a su página oficial, se crea una cuenta para poder empezar a utilizarlo: [https://redislabs.com/](https://redis.com/)
### redis-cli
* Redis-cli es la interfaz de línea de comandos de Redis, un programa simple que permite enviar comandos a Redis y leer las respuestas enviadas por el servidor, directamente desde la terminal.
* Para empezar a usarlo seguir los siguientes pasos de comandos en consola:
1. ```redis-cli```` para conectar el servidor local.
2. ```redis-cli -h host -p port -a password``` para conectar con el servidor remoto.
## SESSION MONGO
### ¿Qué es?
Mediante el paquete de Node llamado connect-mongo se puede utilizar la base de datos de MongoDB para persistir los datos almacenados en Session.
### Empezando con connect-mongo
Instalación del módulo: ```npm install connect-mongo --save```
```JavaScript
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
```
### Usando connect-mongo
Se agrega en el app.use de session una clave en el objeto, especificando la url de Mongo local donde se van a guardar los datos almacenados en session.
```JavaScript
const app = express()
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/sessiones'})
    secret: 'shhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 40000
    }
}))
```
## SESSION MONGO ATLAS
### Empezando a usar Mongo Atlas
* Es lo mismo que session con Mongo pero la diferencia es que Atlas es la base de datos en la nube, por lo que allí se van a almacenar los datos de session. 
* Se necesitan los mismos módulos que para mongo session y se requieren como se muestra a continuación:
```JavaScript
const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true}
```
### Usando Mongo Atlas
Para utilizarlo, debemos conectar con la URL de la base de datos en Atlas, es decir, en la nube.
La constante de advancedOptions definida anteriormente se utiliza para las opciones avanzadas de la conexión con la BD.
```JavaScript
const app = express()
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb:url',
        mongoOptions: advancedOptions
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 40000
    }
}))
```