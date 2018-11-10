const express = require('express');
const router = express.Router();

const Task = require('../models/task')

// Rutas, se adjuntan unas como ejemplo...

router.get('/register', function(req,res){
    res.render('partials/_register');
});

router.get('/',async (req,res)=>{
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

router.get('/desvinculacion', function(req,res){
    res.render('partials/_modDesvinculacion')
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

router.get('/graficos', function(req,res){  //cuenta los colaboradores
    Task.aggregate([{ $unwind: "$colab"},{$count: "cantidad"}],function(err,result){
        if (err) console.log(err);
        res.render('graficos',{result:result});
    });
});

module.exports = router;