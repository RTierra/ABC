const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://ricardo:acdc1314@sky-database-riqjg.gcp.mongodb.net/prueba-abc?retryWrites=true&w=majority').then(()=>{console.log('DB is connected')})

  //  'mongodb+srv://ricardo:acdc1314@sky-database-riqjg.gcp.mongodb.net/prueba-abc?retryWrites=true&w=majority'