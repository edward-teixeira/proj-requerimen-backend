const mongoose = require('mongoose');

const turmaSchema = new mongoose.Schema({
  nomeTurma: {
    type: String,
    trim: true,
    required: true,
    minlength: 1,
    maxlength: 200,
  },
  turmaAlias: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  curso: {
    type: mongoose.Types.ObjectId,
    ref: 'Curso',
  },
  periodo: {
    type: String,
    trim: true,
  },
}, { timestamps: true });


module.exports = mongoose.model('Turma', turmaSchema);
