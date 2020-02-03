const express = require('express');
const router = express.Router();

//Models
const Transaccion = require('../models/Transacciones');
const banco = 'Pichincha';
const entidad = 'Pichincha';

//Inicio

router.get('/pichincha', (req, res) => {
    res.render('banco_pichincha/bp_inicio');
});

//Transacciones

router.get('/pichincha/transacciones_bancarias', (req, res) => {
    res.render('banco_pichincha/transacciones_b');
});

router.post('/pichincha/transacciones_bancarias', async (req, res) => {
    const { title, cantidad } = req.body;
    
    const errors = [];
    if (title == 'Choose...') {
      errors.push({text: 'Escoge una descripcion.'});
    }
    if (!cantidad) {
      errors.push({text: 'Ingresa una cantidad'});
    }
    if (errors.length > 0) {
      res.render('banco_pichincha/transacciones_b', {
        errors,
        title,
        cantidad
      });
    } else {
      const newTranscacion = new Transaccion({title, cantidad, banco, entidad});
      await newTranscacion.save();
      req.flash('success_msg', 'Transaccion registrada');
      res.redirect('/');
    }
  });

  //Pagos y cobros

  router.get('/pichincha/pagosycobros', (req, res) => {
    res.render('banco_pichincha/pagosycobros');
});


router.post('/pichincha/pagosycobros', async (req, res) => {
    const { title, cantidad } = req.body;
   
    const errors = [];
    if (!title) {
      errors.push({text: 'Ingresa un titulo.'});
    }
    if (!cantidad) {
      errors.push({text: 'Ingresa tu descripción'});
    }
    if (errors.length > 0) {
      res.render('banco_pichincha/pagosycobros', {
        errors,
        title,
        cantidad
      });
    } else {
      const newTranscacion = new Transaccion({title, cantidad, banco, entidad});
      await newTranscacion.save();
      req.flash('success_msg', 'Transaccion registrada');
      res.redirect('/');
    }
  });

module.exports = router;