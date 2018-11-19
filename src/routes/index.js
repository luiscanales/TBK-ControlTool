const express = require('express');
const router = express.Router();

const Task = require('../models/task')

//middleware para verificar token
// function verifyToken(req, res, next){
//     if (!req.headers.authorization){
//         res.status(401).send('Sesión no autorizada.')
//     }
//     let token = req.headers.authorization.split(' ')[1]
//     if (token === null){
//         res.status(401).send('Sesión no autorizada.')
//     } else {
//         let payload = jwt.verify(token, 'TBKCTSecretKey')
//         if (!payload){
//             res.status(401).send('Sesión no autorizada.')
//         } else {
//             req.userId = payload.subject
//             next()
//         }
//     }
// }


// Rutas, se adjuntan unas como ejemplo...

router.get('/register', function(req,res){
    res.render('partials/_register');
});

router.get('/', async (req,res)=>{
    const tasks = await Task.find();
    console.log(tasks)
    res.render('index',{
        tasks //tasks: tasks
    });
});

router.get('/about', function(req,res){
    res.render('partials/_about');
});

router.get('/', function(req,res){
    res.render('index');
});

router.get('/login', function(req,res){
    res.render('partials/_login');
});

router.get('/upload', function(req,res){
    res.render('partials/_upload')
});

router.post('/add', async (req,res)=>{
    const task = new Task(req.body);
    await task.save();
    res.redirect('/');
});

router.get('/turn/:id', async (req,res)=>{
    const {id} = req.params;
    const task = await Task.findById(id);
    task.status = !task.status;
    await task.save();
    res.redirect('/');
});

router.get('/delete/:id', async (req,res)=>{
    const {id} = req.params; //obtengo id desde req.params
    await Task.remove({_id: id});
    res.redirect('/');
});


module.exports = router;