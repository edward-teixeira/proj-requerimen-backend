const mongoose = require('mongoose');

const statusType = ['em analise', 'negado', 'aprovado'];

const requerimentoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  nomeAluno: {
    type: String,
    trim: true,
    required: true,
  },
  matricula: {
    type: String,
    trim: true,
    required: true,
  },
  turma: {
    type: String,
    trim: true,
    required: true,
  },
  turno: {
    type: mongoose.Types.ObjectId,
    trim: true,
    required: true,
    ref: 'Turno'
  },
  status: {
    statusName: {
      type: String,
      enum: statusType,
      trim: true,
      default: 'em analise',
    },
    statusDescription: {
      type: String,
      trim: true,
    },
  },
  cpf: {
    type: String,
    trim: true,
    required: true,
  },
  rg: {
    type: String,
    trim: true,
    required: true,
  },
  telefone: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  anexo: {
    type: String
  },
  tipoRequerimento: [{
    type: mongoose.Types.ObjectId,
    ref: 'TipoRequerimento',
  }],
  justificativa: {
    type: String,
    maxlength: 600,
  },
  curso: {
    type: mongoose.Types.ObjectId,
    ref: 'Curso',
  },
  periodo: {
    type: String,
    maxlength: 600,
  },
  retirarFisicamente: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

requerimentoSchema.statics = {
  statusType,
};

module.exports = mongoose.model('Requerimento', requerimentoSchema);
