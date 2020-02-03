const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransaccionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  banco:{
    type: String,
    required: true
  },
  entidad:{
    type:String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model('Transaccion', TransaccionSchema);
