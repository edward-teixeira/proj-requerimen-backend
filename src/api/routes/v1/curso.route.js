const express = require('express');
const validate = require('express-validation');

const turmaRouter = require('./turma.route');
const userController = require('../../controllers/user.controller');
const controller = require('../../controllers/curso.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');
const {
  createCurso, replaceCurso,
  updateCurso, deleteCurso,
} = require('../../validations/curso.validation');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */
router.param('userId', userController.load);

/**
 * Rout nested object turmas for a specified curso
 */
router
  .use('/:cursoId/turmas', turmaRouter);

router
  .route('/')
  /**
   * @api {get} v1/cursos List Cursos
   * @apiDescription Get a list of Cursos
   * @apiVersion 1.0.0
   * @apiName ListCursos
   * @apiGroup User
   * @apiPermission admin
   *
   * @apiSuccess {Object[]} Cursos List of Cursos.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated Cursos can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(), controller.list)
  /**
   * @api {post} v1/cursos Create Curso
   * @apiDescription Create a new Curso
   * @apiVersion 1.0.0
   * @apiName CreateCurso
   * @apiGroup Curso
   * @apiPermission admin
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   * @apiError (Forbidden 403)     Forbidden        Only admins can create the data
   */
  .post(authorize(ADMIN), validate(createCurso), controller.create);

router
  .route('/:cursoId')
  /**
   * @api {get} v1/cursos/:id Get Curso
   * @apiDescription Get Curso information
   * @apiVersion 1.0.0
   * @apiName GetCurso
   * @apiGroup Curso
   * @apiPermission Curso
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(authorize(), controller.get)
  /**
   * @api {put} v1/cursos/:id Replace Curso
   * @apiDescription Replace the whole Curso document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceCurso
   * @apiGroup Curso
   * @apiPermission Curso
   *
   * @apiHeader {String} Authorization   Curso's access token
   *
   * (You must be an admin to change the Curso's role)
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated Cursos can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only Curso with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Curso does not exist
   */
  .put(authorize(ADMIN), validate(replaceCurso), controller.replace)
  /**
   * @api {patch} v1/cursos/:id Update Curso
   * @apiDescription Update some fields of a Curso document
   * @apiVersion 1.0.0
   * @apiName UpdateCurso
   * @apiGroup Curso
   * @apiPermission Curso
   *
   * @apiHeader {String} Authorization   Curso's access token
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated cursos can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only Curso with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Curso does not exist
   */
  .patch(authorize(ADMIN), validate(updateCurso), controller.update)
  /**
   * @api {delete} v1/cursos/:id Delete Curso
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
  .delete(authorize(ADMIN), validate(deleteCurso), controller.remove);

module.exports = router;
