const express = require('express');
const router = express.Router();

//Models
const Transaccion = require('../models/Transacciones');
const entidad = 'Full-carga';

//Inicio

router.get('/fullcarga', (req, res) => {
    res.render('full_carga/fc_inicio');
});

// Pacifico

router.get('/fullcarga/transacciones_pacifico', (req, res) => {
    res.render('full_carga/transacciones_pacifico');
});

router.post('/fullcarga/transacciones_pacifico', async (req, res) => {
    const { title, cantidad } = req.body;
    const banco = 'Pacifico';
    const errors = [];
    if (title == 'Choose...') {
      errors.push({text: 'Escoge una descripcion.'});
    }
    if (!cantidad) {
      errors.push({text: 'Ingresa una cantidad'});
    }
    if (errors.length > 0) {
      res.render('full_carga/transacciones_pacifico', {
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

// Produbanco

router.get('/fullcarga/transacciones_produbanco', (req, res) => {
    res.render('full_carga/transacciones_produbanco');
});

router.post('/fullcarga/transacciones_produbanco', async (req, res) => {
    const { title, cantidad } = req.body;
    const banco = 'Produbanco';
    const errors = [];
    if (title == 'Choose...') {
      errors.push({text: 'Escoge una descripcion.'});
    }
    if (!cantidad) {
      errors.push({text: 'Ingresa una cantidad'});
    }
    if (errors.length > 0) {
      res.render('full_carga/transacciones_produbanco', {
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

router.get('/fullcarga/pagosycobros', (req, res) => {
    res.render('full_carga/pagosycobros');
});

router.post('/fullcarga/pagosycobros', async (req, res) => {
    const { title, cantidad } = req.body;
    const banco = 'Full-carga';
    const errors = [];
    if (title == 'Choose...') {
      errors.push({text: 'Escoge una descripcion.'});
    }
    if (!cantidad) {
      errors.push({text: 'Ingresa una cantidad'});
    }
    if (errors.length > 0) {
      res.render('full_carga/pagosycobros', {
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