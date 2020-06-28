const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
var bodyParser = require('body-parser');

//Conexion a la base de datos
mongoose.connect('mongodb://www.mongosopes.tk/proyecto', 
{ useNewUrlParser: true,  useUnifiedTopology: true },)
    .then(db => console.log('MongoDB conectada'))
    .catch(err => console.log(err));


//importacion de rutas
const indexRoutes = require('./routes/index');

//Configuraciones
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Rutas
app.use('/', indexRoutes);

//Iniciar servidor
app.listen(app.get('port'), () => {
    console.log(`Servidor en el puerto ${app.get('port')}`);
});
