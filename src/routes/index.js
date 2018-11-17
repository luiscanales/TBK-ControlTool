const express = require('express');
var async = require('async');
const router = express.Router();

const Task = require('../models/task')
const Colab = require('../models/Colaboradores')
// Rutas, se adjuntan unas como ejemplo...

router.get('/register', function(req,res){
    res.render('partials/_register');
});

router.get('/',async (req,res)=>{
    const tasks = await Task.find();
    console.log(tasks)
    res.render('index',{
        tasks //tasks : tasks
    })
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

router.get('/desvinculados', function(req,res){
    res.render('desvinculados')
});

router.get('/graficos', function(req,res){  //cuenta los colaboradores
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var f=new Date();
    var a = f.getFullYear();
    var m1,m2,m3,m4;
    m1 = meses[f.getMonth()];
    m2 = meses[f.getMonth()-1];
    m3 = meses[f.getMonth()-2];
    m4 = meses[f.getMonth()-3];
    var result1;
    var result2;
    var result3;
    var result4;
    var mesesUsados = [m1,m2,m3,m4];
    async.series([
    function(callback){
        Colab.aggregate([
            {
                $match:{
                    "_id.periodo":m1,
                    "_id.año": a
                }
            },
            { 
                $unwind: "$colab"
            },
            {
                $count: "cantidad"
            }],
            function(err,result){
                if (err) console.log(err);
                result1 = result;
                callback(null,result1);
            })
    },function(callback){
        if (m1 == "Enero"){
            m2 = "Diciembre";
            a = a - 1;
            mesesUsados[1] = m2
        }
        Colab.aggregate([
            {
                $match:{
                    "_id.periodo":m2,
                    "_id.año": a
                }
            },
            { 
                $unwind: "$colab"
            },
            {
                $count: "cantidad"
            }],
            function(err,result){
                if (err) console.log(err);
                result2 = result;
                callback(null,result2);
            })
    },function(callback){
        if(m1 == "Enero"){
            m3 = "Noviembre";
            a = a-1;
            mesesUsados[2] = m3;
        }else if(m1 == "Febrero"){
            m3 = "Diciembre";
            a = a-1;
            mesesUsados[2] = m3;
        }
        Colab.aggregate([
            {
                $match:{
                    "_id.periodo":m3,
                    "_id.año": a
                }
            },
            { 
                $unwind: "$colab"
            },
            {
                $count: "cantidad"
            }],
            function(err,result){
                if (err) console.log(err);
                result3 = result;
                callback(null,result3);
            })
    },function(callback){
        if(m1 == "Enero"){
            m4 = "Octubre";
            a = a-1;
            mesesUsados[3] = m4;
        }else if(m1 == "Febrero"){
            m4 = "Noviembre";
            a = a-1;
            mesesUsados[3] = m4;
        }else if(m1 == "Marzo"){
            m4 = "Diciembre";
            a = a-1;
            mesesUsados[3] = m4;
        }
        Colab.aggregate([
            {
                $match:{
                    "_id.periodo":m4,
                    "_id.año": a
                }
            },
            { 
                $unwind: "$colab"
            },
            {
                $count: "cantidad"
            }],
            function(err,result){
                if (err) console.log(err);
                result4 = result;
                callback(null,result4);
            })
    }],function(err){
        res.render('graficos',{result1:result1,result2:result2,result3:result3,result4:result4,mesesUsados:mesesUsados});
    })
});

module.exports = router;