const express = require('express');
const validate = require('express-validation');

const controller = require('../../controllers/requerimento.controller');
const { authorize, ADMIN, LOGGED_USER } = require('../../middlewares/auth');

const {
  createRequerimento, replaceRequerimento,
  updateRequerimento, deleteRequerimento,
} = require('../../validations/requerimento.validation');

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/requerimentos Get Requerimentos'
   * @apiDescription Get Requerimentos information
   * @apiVersion 1.0.0
   * @apiName GetRequerimentos
   * @apiGroup Requerimentos
   * @apiPermission Requerimentos
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(authorize(), controller.list)
  /**
   * @api {post} v1/requerimentos Post Requerimentos
   * @apiDescription Post Requerimentos information
   * @apiVersion 1.0.0
   * @apiName PostRequerimentos
   * @apiGroup Requerimentos
   * @apiPermission Requerimentos
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .post(authorize(), validate(createRequerimento), controller.create);

router
  .route('/:requerimentoId')
  /**
   * @api {get} v1/requerimentos/:requerimentoId Get Requerimentos By ID
   * @apiDescription Get Requerimentos information
   * @apiVersion 1.0.0
   * @apiName GetRequerimentos
   * @apiGroup Requerimentos
   * @apiPermission Requerimentos
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(authorize(), controller.get)
  /**
   * @api {put} v1/requerimentos/:requerimentoId PUT Requerimentos By ID
   * @apiDescription PUT Requerimentos information
   * @apiVersion 1.0.0
   * @apiName PUTRequerimentos
   * @apiGroup Requerimentos
   * @apiPermission Requerimentos
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .put(authorize(), validate(updateRequerimento), controller.replace)
  /**
   * @api {patch} v1/requerimentos/:requerimentoId Patch Requerimentos
   * @apiDescription Patch Requerimentos information
   * @apiVersion 1.0.0
   * @apiName PatchRequerimentos
   * @apiGroup Requerimentos
   * @apiPermission Requerimentos
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .patch(authorize(), validate(replaceRequerimento), controller.update)
  /**
   * @api {delete} v1/requerimentos/:requerimentoId Delete Requerimentos
   * @apiDescription Delete Requerimentos information
   * @apiVersion 1.0.0
   * @apiName DeleteRequerimentos
   * @apiGroup Requerimentos
   * @apiPermission Requerimentos
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .delete(authorize(), validate(deleteRequerimento), controller.delete);

module.exports = router;
