const mongoose = require('mongoose');

const cursoSchema = new mongoose.Schema({
  cursoNome: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  cursoAlias: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  turno: {
    type: mongoose.Types.ObjectId,
    ref: 'Turno',
  },
}, { timestamps: true });

module.exports = mongoose.model('Curso', cursoSchema);
