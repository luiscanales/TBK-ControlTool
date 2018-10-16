const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//conexión a base de datos
mongoose.connect('mongodb://localhost/tbk-controltool')
    .then(db => console.log('Base de datos conectada exitosamente.'))
    .catch(err => console.log(err));


//importar rutas
const indexRoutes = require('./routes/index');

//configuraciones
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname + '/views'));
app.set('view engine','ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

//rutas
app.use('/',indexRoutes);

//starting the server
app.listen(app.get('port'), ()=>{
    console.log(`Servidor conectado en puerto ${app.get('port')}`);
});