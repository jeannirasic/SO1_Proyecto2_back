const express = require('express');
const router = express.Router();
const Proyecto = require('../models/proyecto');
const redis = require('redis');

//Conexion con redis
let client = redis.createClient({
  port      : 6379,               
  host      : '34.67.42.245'        
});

client.on('connect', function(){
  console.log('Redis conectada');
});


//Funcion principal
router.get('/', (req, res) => {
    res.send('Servidor corriendo');
});

//MONGO--------------------------------------------------------------------------------

//Funcion de obtener usuarios en mongodb
router.route('/usuarios').get(function(req, res) {
    Proyecto.find(function(err, proyecto) {
    if (err){
      res.send(err);
    }
    res.json(proyecto);
  });
});

//Funcion de obtener departamentos en mongodb
router.route('/departamentos').get(function(req, res) {
    Proyecto.find({}, 'Departamento', function(err, proyecto) {
    if (err){
      res.send(err);
    }
    res.json(proyecto);
  });
});

//Funcion de insertar usuarios en mongodb
router.route('/mongoUsuarios').post(function(req, res) {
    var proyecto = new Proyecto(); 
    proyecto.Nombre = req.body.Nombre; 
    proyecto.Departamento = req.body.Departamento;
    proyecto.Edad = req.body.Edad;
    proyecto.Forma = req.body.Forma;
    proyecto.Estado = req.body.Estado;
    proyecto.save(function(err) {
      if (err){ 
        res.send(err);
      }
    res.json({ message: 'Datos insertados correctamente' });
  });
});

//REDIS-------------------------------------------------------------------------------
//Funcion para obtener las claves
router.route('/claves').get(function(req, res){
  client.keys('*',  function(err, reply){
    if(err){
      res.send(err);
    }else{
      res.json(reply);
    }
  });
});


//Funcion de obtener ultimo usuario redis
router.route('/ultimoCaso/:Id').get(function(req, res){
  let Id = req.params.Id;
  client.hgetall(Id, function(err, obj){
    if(!obj){
      res.send(err);
    }else{
      res.json(obj);
    }
  });
});

//Funcion de obtener edades redis
router.route('/edades/:Id').get(function(req, res){
  let Id = req.params.Id;
  client.hget(Id, 'Edad', function(err, obj){
    if(!obj){
      res.send(err);
    }else{
      res.json(obj);
    }
  });
});


//Funcion de insertar usuarios redis
router.route('/redisUsuarios').post(function(req, res) {
  let Id = req.body.Id; 
  let Nombre = req.body.Nombre; 
  let Departamento = req.body.Departamento;
  let Edad = req.body.Edad;
  let Forma = req.body.Forma;
  let Estado = req.body.Estado;
  
  client.hmset(Id, [
    'Nombre', Nombre,
    'Departamento', Departamento,
    'Edad', Edad,
    'Forma', Forma,
    'Estado', Estado
  ], function(err, reply){
    if(err){
      res.send(err);
    }
    console.log(reply);
    res.send(reply);
  });
});

module.exports = router;