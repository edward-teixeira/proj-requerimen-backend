const Joi = require('joi');

module.exports = {

  // POST api/v1/misc/tipoRequerimento
  createTipoRequerimento: {
    body: {
      nome: Joi.string().min(1).max(200).required(),
      descricao: Joi.string().max(500),
    },
  },

  // PATCH api/v1/misc/tipoRequerimento/:id
  updateTipoRequerimento: {
    body: {
      nome: Joi.string().min(1).max(200).required(),
      descricao: Joi.string().max(500),
    },
    params: {
      id: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
  },

  // PUT api/v1/misc/tipoRequerimento/:id
  replaceTipoRequerimento: {
    body: {
      nome: Joi.string().min(1).max(200).required(),
      descricao: Joi.string().max(500),
    },
    params: {
      id: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
  },

  // DELETE api/v1/misc/tipoRequerimento/:id
  deleteTipoRequerimento: {
    params: {
      id: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
  },
};
