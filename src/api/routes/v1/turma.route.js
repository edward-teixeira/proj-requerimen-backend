const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/turma.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');
const {
  createTurma, replaceTurma,
  updateTurma, deleteTurma,
} = require('../../validations/turma.validation');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  /**
   * @api {get} v1/cursos/:cursoId/turmas List Turmas for Cursos
   * @apiDescription Get a list of Turmas for a specified Curso
   * @apiVersion 1.0.0
   * @apiName ListTurmas
   * @apiGroup Turma
   * @apiPermission admin
   *
   * @apiSuccess {Object[]} Curso List of Turmas.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Admin Users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(), controller.list)
  /**
   * @api {post} v1/cursos/:cursoId/turmas Create Turma for Curso
   * @apiDescription Create a new Turma of a specified Curso
   * @apiVersion 1.0.0
   * @apiName CreateTurma
   * @apiGroup Turma
   * @apiPermission admin
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createTurma), controller.create);

router
  .route('/:turmaId')
  /**
   * @api {get} v1/cursos/:cursoId/turmas/:turmaId Get Turma by ID
   * @apiDescription Get turma information for the specified curso
   * @apiVersion 1.0.0
   * @apiName GetTurma
   * @apiGroup Turma
   * @apiPermission admin
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(authorize(), controller.get)
  /**
   * @api {put} v1/cursos/:cursoId/turmas/:turmaId  Update Turma
   * @apiDescription Update the whole Turma document with a new one
   * @apiVersion 1.0.0
   * @apiName UpdateTurma
   * @apiGroup Turma
   * @apiPermission admin
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated Cursos can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only Curso with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Curso does not exist
   */
  .patch(authorize(ADMIN), validate(updateTurma), controller.update)
  /**
   * @api {put} v1/cursos/:cursoId/turmas/:turmaId  Replace Turma
   * @apiDescription Replace the whole Turma document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceTurma
   * @apiGroup Turma
   * @apiPermission admin
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated Cursos can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only Curso with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Curso does not exist
   */
  .put(authorize(ADMIN), validate(replaceTurma), controller.replace)
/**
   * @api {delete} v1/cursos/:cursoId/turmas/:turmaId  Delete Curso
   * @apiDescription Delete a Curso
   * @apiVersion 1.0.0
   * @apiName DeleteCurso
   * @apiGroup Curso
   * @apiPermission Curso
   *
   * @apiHeader {String} Authorization   Curso's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated Cursos can delete the data
   * @apiError (Forbidden 403)  Forbidden   Only Curso with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Curso does not exist
   */
  .delete(authorize(ADMIN), validate(deleteTurma), controller.delete);

module.exports = router;
