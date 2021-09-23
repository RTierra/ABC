const express = require('express');
const router = express.Router();
//Models
const Productos = require('../models/Productos');


//Transacciones

router.get('/papeleria', (req, res) => {
    res.render('papeleria/productos');
});


router.get('/inventario', async (req, res) => {
    //DATOS generales
    //Transacciones de la base de datos
    const productos = await Productos.find().lean();
    //Ultimas 5 transaccciones para mostrar
    var ultimas = productos.slice(-4);

    res.render('papeleria/inventario', { ultimas });
});

router.post('/borr/inventario', async (req, res) => {
    const { nombre } = req.body;
    await Productos.findByIdAndDelete(nombre);
    req.flash('success_msg', 'Producto Eliminado');
    res.redirect('/inventario')
  });

router.post('/inventario', async (req, res) => {
    const { nombre, tipo, marca, precio } = req.body;

    //Tiempo
    var tiempo = new Date();

    const dia = tiempo.getDate();
    const mes = tiempo.getMonth() + 1;
    const ano = tiempo.getFullYear();

    const minuto = tiempo.getMinutes();
    const hora = tiempo.getHours();

    const date_d = dia;
    const date_ma = mes + "/" + ano;

    const date = dia + '/' + mes + '/' + ano;
    const time = hora + ':' + minuto;


    const errors = [];
    if (!nombre) {
      errors.push({text: 'Ingresa el nombre'});
    }
    if (!tipo) {
      errors.push({text: 'Ingresa el tipo'});
    }
    if (!marca) {
      errors.push({text: 'Ingresa la marca'});
    }
    if (!precio) {
      errors.push({text: 'Ingresa un precio'});
    }
    if (errors.length > 0) {
      res.render('papeleria/inventario', {
        errors,
        nombre,
        tipo,
        marca,
        precio
      });
    } else {
      const newTranscacion = new Productos({nombre, tipo, marca, precio, date, date_d, date_ma, time});
      await newTranscacion.save();
      req.flash('success_msg', 'Producto agregado');
      res.redirect('/inventario');
    }
  });
module.exports = router;