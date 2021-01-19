const Joi = require('joi');
const Requerimento = require('../models/requerimento.model');

module.exports = {
  // POST api/v1/requerimentos
  createRequerimento: {
    body: {
      nomeAluno: Joi.string().min(1).max(200).required(),
      cpf: Joi.string().required(),
      rg: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().email().required(),
      justificativa: Joi.string().max(600),
      curso: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
  },

  // UPDATE api/v1/requerimentos
  updateRequerimento: {
    body: {
      nomeAluno: Joi.string().min(1).max(200).required(),
      cpf: Joi.string().required(),
      rg: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().email().required(),
      justificativa: Joi.string().max(600),
      curso: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
    // params: {
    //   requerimendoId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    // },
  },

  // REPLACE api/v1/requerimentos
  replaceRequerimento: {
    body: {
      nomeAluno: Joi.string().min(1).max(200).required(),
      cpf: Joi.string().required(),
      rg: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().email().required(),
      justificativa: Joi.string().max(600),
      curso: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
    // params: {
    //   requerimendoId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    // },
  },
  // DELETE api/v1/requerimentos
  deleteRequerimento: {
    // params: {
    //   requerimendoId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    // },
  },
};
