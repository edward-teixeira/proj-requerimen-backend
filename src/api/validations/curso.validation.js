const Joi = require('joi');

module.exports = {

  // POST api/v1/cursos
  createCurso: {
    body: {
      cursoNome: Joi.string().required().min(1).max(200),
      cursoAlias: Joi.string().max(200),
      turno: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
  },

  // PUT api/v1/cursos/:cursoId
  replaceCurso: {
    body: {
      cursoNome: Joi.string().required().min(1).max(200),
      cursoAlias: Joi.string().max(200),
      turno: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
    params: {
      cursoId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // PATCH api/v1/cursos/:cursoId
  updateCurso: {
    body: {
      cursoNome: Joi.string().required().min(1).max(200),
      cursoAlias: Joi.string().max(200),
      turno: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
    params: {
      cursoId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },

  // DELETE api/v1/cursos/:cursoId
  deleteCurso: {
    params: {
      cursoId: Joi.string().regex(/^[a-fA-F0-9]{24}$/).required(),
    },
  },
};
