const mongoose = require('mongoose');


const anexoSchema = new mongoose.Schema({
  anexoPath: {
    type: String,
    trim: true,
    required: true,
  },
  descricao: {
    type: String,
    trim: true,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Anexo', anexoSchema);
