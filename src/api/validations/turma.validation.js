const Joi = require('joi');

module.exports = {

  // POST api/v1/cursos/:cursoId/turma
  createTurma: {
    body: {
      nomeTurma: Joi.string().required().min(1).max(200),
      turmaAlias: Joi.string().max(200),
      curso: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      periodo: Joi.string(),
    },
  },

  // PUT api/v1/cursos/:cursoId/turma/:turmaId
  replaceTurma: {
    body: {
      nomeTurma: Joi.string().required().min(1).max(200),
      turmaAlias: Joi.string().max(200),
      curso: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      periodo: Joi.string(),
    },
    params: {
      turmaId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
  },

  // PATCH api/v1/cursos/:cursoId/turma/:turmaId
  updateTurma: {
    body: {
      nomeTurma: Joi.string().required().min(1).max(200),
      turmaAlias: Joi.string().max(200),
      curso: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
      periodo: Joi.string(),
    },
    params: {
      turmaId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
  },

  // DELETE api/v1/cursos/:cursoId/turma/:turmaId
  deleteTurma: {
    params: {
      turmaId: Joi.string().regex(/^[a-fA-F0-9]{24}$/),
    },
  },
};

