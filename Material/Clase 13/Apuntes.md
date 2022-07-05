# Clase 13
## AUTORIZACIÓN VS. AUTENTICACIÓN
### Autenticación
* Es el proceso de identificación de usuarios para asegurarse su identidad.
* Existen diversos métodos para probar a autenticación, siendo la contraseña el más conocido y utilizado.
* Parte del principio de que si el usuario dispone de las credenciales requeridas (por ejemplo, nombre de usuario y contraseña), el sistema puede validar la identidad del usuario y emitir el acceso a los recursos solicitados.
### Autorización
* Define la información, los servicios y recursos del sistema a los que podrá acceder el usuario autenticado.
* Uno de sus usos más comunes es para enerar distintos permisos para el usuario común y el administrador, quienes tendrán acceso a distintos tipo de recursos.
* Existen distintos métodos para autorizar usuarios.
* Suele utilizarse el método mediante **middlewares**, donde permitan el acceso según el tipo de usuario autenticado (admin, cliente, etc.).
### Métodos de autenticación
* **Usuario y contraseña**: Es el método tradicional más utilizado, donde el usuario ingresa username o email y password para autenticarse.
* **Sin contraseña (passwordless)**: Consiste en que, cada vez que queramos iniciar sesión a un recurso, se nos enviará al email un enlace que nos permitirá acceder sin necesidad de contraseña.
* **Por redes sociales**: Varias aplicaciones nos dan como opción iniciar sesión directamente con alguna red social. La ventaja principal es que se usan directamente los datos de esa cuenta social para hacer el inicio de sesión.
* **Datos biométricos**: Autentica usuarios mediante huellas dactilares.
* **JWT(JSON Web Token)**: Este método open source permite la transmisión segura de datos entre las distintas partes. Comúnmente se utiliza para la autorización a partir de un par de claves que contiene una clave privada y una pública. 
* **OAuth 2.0**: Permite que mediante una API, el usuario se autentique y acceda a los recursos del sistema que necesita.
## PASSPORT
### ¿De qué se trata?
* Passport es un *middleware* de autenticación de NodeJS.
* Cumple únicamente la función de autenticar solicitudes, por lo que delega todas las demás funciones a la aplicación. *Esto mantiene el código limpio y fácil de mantener.*
* Passport reconoce los distintos métodos de login utilizados actualmente, por lo que sus mecanismos de autenticación se empaquetan como módulos individuales. Entonces, no es necesario crear dependencias que no se vayan a utilizar.
* Cada uno de estos mecanismos se llaman **strategies**.
### Strategies
* Cada strategy tiene un módulo distinto de NodeJS para instalar.
* Las strategy disponibles son:
    * **passport-local** para autenticación de usuarios mediante nombre de usuario y contraseña.
    * **passport-openid** para autenticación mediante OpenId (estándar abierto para la autenticación federada).
    * **passport-oauth** para autenticación mediante API de otros proveedores como de redes sociales.
## PASSPORT LOCAL
### Empezar a utilizar Passport-local
En primer lugar debemos instalar el módulo passport y el de  passport-local ```npm install passport passport-local```
ademas instalar ```bcrypt express express-handlebars express-session mongoose passport passport-local```
### Requerir los módulos
* Se requiere el módulo de passport, unto con el módulo de passport-local, que nos da control para implementar manualmente el mecanismo de autenticación
```JavaScript
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
```
### Configurar LocalStrategy de login
```JavaScript
passport.use('login', new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username }, (err, user) => {
            if (err)
                return done(err);
            if (!user) {
                console.log('User Not Found with username ' + username);
                return done(null, false);
            }
            if (!isValidPassword(user, password)) {
                console.log('Invalid Password');
                return done(null, false);
            }
            return done(null, user);
        });
    })
);
```
* Se define una nueva instancia de LocalStrategy y se la carga mediante el método ```passport.use( )```.
* El primer parámetro es el nombre de la strategy (“login” en este caso) y el segundo es una instancia de la estrategia que se desea usar (LocalStrategy en este caso).
* LocalStrategy espera encontrar por defecto las credenciales de usuario en los parámetros nombre de usuario ‘username’ y contraseña ‘password’ (si se definen con otros nombres, no los encontrará!)
* Buscamos el usuario por su username en la base de datos mediante ```User.findOne( )```.
* Utilizamos el *callback* de verificación ```done``` en el *return* para devolver lo que corresponda.
* Si el usuario se encuentra en la base de datos y es válido se devuelve en el ```done``` : *null* (indicando que no hubo error) y el usuario encontrado user.
* La función isValidPassword es: 
```JavaScript
function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}
```
### Configurar LocalStrategy de signup
Para crear la instancia de strategy para el registro de nuevo usuario, es similar al de login. La diferencia es que primero chequeamos si ya existe o no ese usuario.
* Si no existe, creamos un usuario nuevo y lo guardamos en la base de datos.
* Si ya existe, devolvemos un mensaje que lo informe, dando error al registrar.
```JavaScript
passport.use('signup', new LocalStrategy ({ passReqToCallback:  true },
    (req, username, password, done) => {
        User.findOne({ 'username' : username }, function 
            (err, user) {
                if (err) {
                    console.log('Error in SignUp: '  + err);
                    return done(err);
                }
                if (user) {
                    console.log('User already exists' );
                    return done(null, false)
                }
                const newUser = {
                    username: username,
                    password: createHash (password),
                    email: req.body.email,
                    firstName:  req.body.firstName,
                    lastName: req.body.lastName,
                }
                User.create(newUser, (err, userWithId ) => {
                if (err) {
                    console.log('Error in Saving user: '  + err);
                return done(err);
            }
            console.log(user)
            console.log('User Registration succesful' );
            return done(null, userWithId );
        });
    });
}))
function createHash (password) {
    return bCrypt.hashSync(
        password ,
        bCrypt.genSaltSync (10),
        null);
}
```
### Serializar y deserializar
* Para restaurar el estado de autenticación a través de solicitudes HTTP, Passport necesita serializar usuarios y deserializarlos fuera de la sesión. Esto se hace de modo que cada solicitud subsiguiente no contenga las credenciales del usuario anterior.
* Se suele implementar proporcionando el ID de usuario al serializar y consultando el registro de usuario por ID de la base de datos al deserializar.
* Los métodos que proporciona Passport para esto son *serializeUser* y *deserializeUser*.
* El código ejemplo de ambos métodos se muestra a continuación.
* Se puede ver que el método *serializeUser* utiliza el id del usuario y el *deserializeUser* utiliza el objeto de usuario, como lo mencionamos antes.
```JavaScript
passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser((id, done) => {
    User.findById(id, done);
});
```
### Iniciar passport
```JavaScript
const app = express();
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: config.TIEMPO_EXPIRACION
    },
    rolling: true,
    resave: true,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
```
* Debemos inicializar con app.use( ) express y express-session.
* Además, debemos inicializar passport como se muestra en el código.
### Definir las rutas
Definimos las rutas de index, login, singup, logout y fail route. En las rutas por post de login y signup, en las que se procesan los datos ingresados en los formularios, utilizamos como middleware el método authenticate de passport, con el nombre de la LocalStrategy configurada como primer parámetro, y a dónde redirigir en caso de falla como segundo.
```JavaScript
// Index
app.get('/', routes.getRoot);

// Login
app.get('/login', routes.getLogin);
app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), routes.postLogin);
app.get('/faillogin', routes.getFaillogin);

// Signup
app.get('/signup', routes.getSignup);
app.post('/signup', passport.authenticate('signup', { failureRedirect: 'failsignup' }), routes.postSignup);
app.get('/failsignup', routes.getFailsignup);

// Logout
app.get('/logout', routes.getLogout);

// Fail Route
app.get('*', routes.failRoute);
```
### Métodos definidos en las rutas
* Observamos que las rutas por get muestran una vista o un mensaje.
* En getLogin primero verifica si ya está logueado, mediante el método isAuthenticated del request req que nos da passport.
```JavaScript
// Index
function getRoot(req, res) {
    res.send("Bienvenido")
}

// Login
function getLogin(req, res) {
    if(req.isAuthenticated()) {
        let user = req.user;
        console.log("User Logueado");
        res.render("profileUser", {user});
    } else {
        console.log('user NO logueado');
        res.render('login');
    }
}

// Signup
function getSignup(req, res) {
    res.render('signup')
}

// Process Login
function postLogin(req, res) {
    let user = req.user;
    res.render('profileUser')
}

//Process Signup
function postSignup (req, res) {
    let user = req.user;
    res.render('profileUser')
}

function getFaillogin(req, res) {
    console.log('error en login');
    res.render('login-error', {});
}

function getFailsignup(req, res) {
    console.log('error en signup');
    res.render('signup-error', {});
}

//Logout
function getLogout(req, res) {
    req.logout();
    res.render('index');
}

function failRoute(req, res) {
    res.status(404).render('routing-error', {});
}
```
* Las rutas por *post* solo muestran una vista ya que el inicio de sesión en sí lo realiza directo *passport* con el middleware *passport.authenticate*.
* Para el *getLogout* se utiliza el método **logout** del *request* **req** que nos da *passport*.
### Autorizar rutas protegidas
* Mediante *middlewares*, podemos proteger distintas rutas, de modo que solo se pueda acceder si hay un usuario logueado.
* Para esto, usamos nuevamente ```req.isAuthenticated( )```. Si existe, entonces podemos continuar mediante ```next( )```. Si no existe, redirigimos al *login*.
```JavaScript
function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect('/login').
    }
}
```
### Autorizar rutas protegidas
En la o las ruta/s que queremos proteger, se agrega el middleware que vimos en la diapositiva anterior. Queda entonces, como se muestra en el siguiente código.
```JavaScript
app.get('/ruta-protegida', checkauthentication, (req, res) => {
    let user = req.user;
    console.log(user);
    res.send('<h1>Ruta OK!</h1>');
});
```
## PASSPORT-TWITTER
### TwitterStrategy
* La estrategia de Twitter permite a los usuarios iniciar sesión en una aplicación web utilizando su cuenta de Twitter.
* Internamente, la autenticación de Twitter funciona con **OAuth 1.0a**.
* El soporte para Twitter se implementa mediante el módulo ***passport-twitter***.
* Es prácticamente igual a lo que vimos con Facebook.
### Twitter for Developers
* Para habilitar la autenticación a través de Twitter, primero tenemos que crear una Twitter App utilizando el Twitter Developers.
* Una vez creada la App, necesitamos los datos de App ID y App Secret asignados a la app. Debemos además, especificar una URL para redireccionar al usuario una vez que inicia sesión con Twitter.
* Para empezar a crear esta app, debemos primero ingresar con nuestra cuenta de Twitter al [siguiente link](https://developer.twitter.com/en/portal/projects-and-apps)
### Crear Twitter App
1. Al ingresar con una cuenta válida de Twitter, nos pedirá seguir unos los pasos, completar unos formularios requeridos y finalmente verificar nuestro email.
2. En la barra lateral elegir Overview (dentro de Projects & Apps) y clickear el botón + Create App.
3. Elegir el nombre para la app.
4. Finalmente, nos muestra el API Key y el API Secret Key que es lo que necesitamos para la configuración.
5. Adicionalmente, debemos configurar la aplicación para que pueda ser usada para autenticación.
6. También debemos configurar la aplicación para que pueda ser usada para autenticación...
7. Por último, debemos configurar la aplicación para que pueda ser usada para autenticación...y permitirle a la aplicación acceder a nuestros datos.
### Empezar a usar passport-twitter
En primer lugar, instalamos el módulo de passport-twitter: ```npm install passport-twitter```<br>
Se requiere el módulo de *passport*, y además, se define la *TwitterStrategy*, requiriendo el módulo *passport-twitter*
```JavaScript
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
```
### Configurar passport-twitter
* De igual forma que en el caso de Facebook, utilizamos passport.use para configurar el módulo.
* El primer parámetro es el objeto con la Key, Secret Key y el callbackURL que es la ruta a la que redirige luego del login.
* Luego, está el callback de verificación que busca el usuario en la base de datos. En este, el parámetro profile contiene la información de usuario provista por Twitter.
```JavaScript
passport.use(new TwitterStrategy({
        consumerKey: TWITTER_CONSUMER_KEY,
        consumerSecret: TWITTER_CONSUMER_SECRET,
        callbackURL: "http://www.example.com/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        User.findOrCreate(profile.id, function(err, user) {
            if(err) { return done(err); }
            done(null, user);
        })
    }
));
```
### Configurar las Rutas
* Se requieren **dos rutas** para la autenticación de Twitter. La primera inicia una transacción OAuth y redirige al usuario a Twitter. La segunda es la URL a la que Twitter redirigirá al usuario después de que haya iniciado sesión.
* En ambas, utilizamos el método ***passport.authenticate***, especificando que se trata de Twitter(va como primer parámetro del método).
```JavaScript
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
    passport.authenticate('twitter', { successRedirect: '/',
                                       failureRedirect: '/login' })
);
```