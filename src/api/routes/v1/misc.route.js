const express = require('express');
const validate = require('express-validation');

const { authorize, ADMIN } = require('../../middlewares/auth');
const turnoController = require('../../controllers/turno.controller');

const tipoRequerimentoController = require('../../controllers/tipoRequerimento.controller');
const {
  createTipoRequerimento, updateTipoRequerimento,
  replaceTipoRequerimento, deleteTipoRequerimento,
} = require('../../validations/tipoRequerimento.validation');

const router = express.Router();

/*
* This is a temp route
*/
router
  .route('/turnos')
  .get(authorize(), turnoController.list)
  .post(authorize(ADMIN), turnoController.create);

/*
* Tipo requerimento route
*/
router
  .route('/tipoRequerimento')
  .get(authorize(), tipoRequerimentoController.list)
  .post(authorize(ADMIN), validate(createTipoRequerimento), tipoRequerimentoController.create);

router
  .route('/tipoRequerimento/:id')
  .get(authorize(), tipoRequerimentoController.get)
  .put(authorize(ADMIN), validate(replaceTipoRequerimento), tipoRequerimentoController.replace)
  .patch(authorize(ADMIN), validate(updateTipoRequerimento), tipoRequerimentoController.update)
  .delete(authorize(ADMIN), validate(deleteTipoRequerimento), tipoRequerimentoController.delete);

module.exports = router;
