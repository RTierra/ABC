const express = require('express');
const router = express.Router();
const Transaccion = require('../models/Transacciones');


router.get('/', async (req, res) => {
//DATOS generales
  //Transacciones de la base de datos
  const transaccions = await Transaccion.find();

  //Ultimas 5 transaccciones para mostrar
  var ultimas = transaccions.slice(-5);

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



//DATOS Banco Pichincha
  //Transacciones de la base de datos
  const pichincha = await Transaccion.find({entidad:"Pichincha"});

  //Transacciones de reduccion de capital en la plataforma (Deposito)
  const  dism_pichincha = pichincha => pichincha.title !== 'Retiro'
  var disminuye_pichincha = pichincha.filter(dism_pichincha);

  //Transacciones de aumento de capital  en la plataforma (Retiro)
  const  aume_pichincha = pichincha => pichincha.title == 'Retiro'
  var aumenta_pichincha = pichincha.filter(aume_pichincha);

  //Suma total de reduccion
  var acumdism_pichincha = 0;
  for (var i=0; i<disminuye_pichincha.length; i++){
    acumdism_pichincha = acumdism_pichincha + disminuye_pichincha[i].cantidad;
  };

  //Suma total de aumento
  var acumaume_pichincha = 0;
  for (var i=0; i<aumenta_pichincha.length; i++){
    acumaume_pichincha = acumaume_pichincha + aumenta_pichincha[i].cantidad;
  };

  //Suma total de cantidades en la base de datos
  var acum_pichincha = acumaume_pichincha - acumdism_pichincha;



//DATOS Full-carga
  //Transacciones de la base de datos
  const full_carga = await Transaccion.find({entidad:"Full-carga"});
    
  //Transacciones de reduccion de capital en la plataforma (Deposito)
  const  dism_full_carga = full_carga => full_carga.title !== 'Retiro'
  var disminuye_full_carga = full_carga.filter(dism_full_carga);

  //Transacciones de aumento de capital  en la plataforma (Retiro)
  const  aume_full_carga = full_carga => full_carga.title == 'Retiro'
  var aumenta_full_carga = full_carga.filter(aume_full_carga);

  //Suma total de reduccion
  var acumdism_full_carga = 0;
  for (var i=0; i<disminuye_full_carga.length; i++){
    acumdism_full_carga = acumdism_full_carga + disminuye_full_carga[i].cantidad;
  };

  //Suma total de aumento
  var acumaume_full_carga = 0;
  for (var i=0; i<aumenta_full_carga.length; i++){
    acumaume_full_carga = acumaume_full_carga + aumenta_full_carga[i].cantidad
  };

  //Suma total de cantidades en la base de datos
  var acum_full_carga = acumaume_full_carga - acumdism_full_carga;


  res.render('index', { transaccions, ultimas, acum, acumdism, acumaume, acum_pichincha, acum_full_carga });
});


module.exports = router;
