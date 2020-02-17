const express = require('express');
const router = express.Router();
const Transaccion = require('../models/Transacciones');

//Inicio
router.get('/reportes', (req, res) => {
    res.render('reportes/reportes');
});


//Logica deprogramacion; Retiro=aumenta Deposito=disminuye
//Reportes todos    
router.get('/reportes/todos', async (req, res) => {

    //Transacciones de la base de datos
    const transaccions = await Transaccion.find();

    //Transacciones de reduccion de capital en la plataforma (Deposito)
    const  dism = transaccions => transaccions.title !== 'Retiro'
    var disminuye = transaccions.filter(dism);
  
    //Transacciones de aumento de capital  en la plataforma (Retiro)
    const  aume = transaccions => transaccions.title == 'Retiro'
    var aumenta = transaccions.filter(aume);
  
    //Suma total de reduccion
    var acumdism = 0;
    for (var i=0; i<disminuye.length; i++){
      acumdism = acumdism + disminuye[i].cantidad;
    };
  
    //Suma total de aumento
    var acumaume = 0;
    for (var i=0; i<aumenta.length; i++){
      acumaume = acumaume + aumenta[i].cantidad
    };
  
    //Suma total de cantidades en la base de datos
    var acum = acumaume - acumdism;
    
    res.render('reportes/movimientos', { transaccions, acum, acumdism, acumaume});
});

//Reportes Bco. Pichincha
router.get('/reportes/BcoPichincha', async (req, res) => {
    //Transacciones de la base de datos
    const transaccions = await Transaccion.find({entidad:"Pichincha"});
    
    //Transacciones de reduccion de capital en la plataforma (Deposito)
    const  dism = transaccions => transaccions.title !== 'Retiro'
    var disminuye = transaccions.filter(dism);
  
    //Transacciones de aumento de capital  en la plataforma (Retiro)
    const  aume = transaccions => transaccions.title == 'Retiro'
    var aumenta = transaccions.filter(aume);
  
    //Suma total de reduccion
    var acumdism = 0;
    for (var i=0; i<disminuye.length; i++){
      acumdism = acumdism + disminuye[i].cantidad;
    };
  
    //Suma total de aumento
    var acumaume = 0;
    for (var i=0; i<aumenta.length; i++){
      acumaume = acumaume + aumenta[i].cantidad
    };
  
    //Suma total de cantidades en la base de datos
    var acum = acumaume - acumdism;
    
    res.render('reportes/BcoPichincha', { transaccions, acum, acumdism, acumaume});
});

//Reportes Full-carga
router.get('/reportes/Full-carga', async (req, res) => {
    //Transacciones de la base de datos
    const transaccions = await Transaccion.find({entidad:"Full-carga"});
    
    //Transacciones de reduccion de capital en la plataforma (Deposito)
    const  dism = transaccions => transaccions.title !== 'Retiro'
    var disminuye = transaccions.filter(dism);
  
    //Transacciones de aumento de capital  en la plataforma (Retiro)
    const  aume = transaccions => transaccions.title == 'Retiro'
    var aumenta = transaccions.filter(aume);
  
    //Suma total de reduccion
    var acumdism = 0;
    for (var i=0; i<disminuye.length; i++){
      acumdism = acumdism + disminuye[i].cantidad;
    };
  
    //Suma total de aumento
    var acumaume = 0;
    for (var i=0; i<aumenta.length; i++){
      acumaume = acumaume + aumenta[i].cantidad
    };
  
    //Suma total de cantidades en la base de datos
    var acum = acumaume - acumdism;
    
    res.render('reportes/Full-carga', { transaccions, acum, acumdism, acumaume});
});

  module.exports = router;