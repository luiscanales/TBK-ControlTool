const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


//conexión a base de datos

mongoose.connect('mongodb://localhost/tbk-controltool', { useNewUrlParser: true })
    .then(db => console.log('Base de datos conectada exitosamente.'))
mongoose.connect('mongodb://localhost/tbk-controltool', { useNewUrlParser: true }, )
    .then(db => console.log('Db connected'))
    .catch(err => console.log(err));


//importar rutas
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const importRoutes = require('./routes/import');


//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'ejs');

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

//rutas
app.use('/', indexRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

//starting the server
app.listen(app.get('port'), () => {
    console.log(`Servidor conectado en puerto ${app.get('port')}`);
    app.use('/', indexRoutes);
    app.use('/', importRoutes);
});