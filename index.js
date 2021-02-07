//Carga de librerias
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');

//Carga de enrutadores
const auth = require(__dirname + '/routes/auth');
const productos = require(__dirname + '/routes/productos');
const publico = require(__dirname + '/routes/publico');

//Conectamos la base de datos de MongoDB
mongoose.connect('mongodb://localhost:27017/ProdAsturianosV3', { useNewUrlParser: true });

// Inicializamos express
let app = express();

//Configuramos el motor de plantillas de Nunjucks
nunjucks.configure('views', {
    autoescape: true,
    express: app
});
app.set('view engine', 'njk');

// Cargar middleware body-parser para peticiones POST y PUT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware para procesar otras peticiones que no sean GET o POST
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

//Configuramos la autenticacion basada en sesiones
/*
    Es importante poner este middleware ANTES de cargar los enrutadores con app.use,
    para que éstos tengan esta configuración aplicada
*/
app.use(session({
    secret: '1234',
    resave: true,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

//Carga de /plublic para los css y las fotos y enrutadores
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/', publico);
app.use('/admin', productos);
app.use('/auth', auth);

// Puesta en marcha del servidor
app.listen(8080);