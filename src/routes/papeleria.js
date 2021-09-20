const express = require('express');
const router = express.Router();


//Transacciones

router.get('/papeleria', (req, res) => {
    res.render('papeleria/productos');
});

router.get('/inventario', (req, res) => {
    res.render('papeleria/inventario');
});

module.exports = router;