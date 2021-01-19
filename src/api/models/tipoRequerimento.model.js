const mongoose = require('mongoose');

const tipoRequerimentoSchema = new mongoose.Schema({
  nome: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    minlength: 1,
    maxlength: 200,
  },
  descricao: {
    type: String,
    trim: true,
    maxlength: 500,
  },
}, { timestamps: true });

module.exports = mongoose.model('TipoRequerimento', tipoRequerimentoSchema);
