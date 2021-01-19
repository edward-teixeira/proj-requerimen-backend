const express = require('express');
const multer = require('multer');

const { storage, fileMaxLimit, checkExt } = require('../../middlewares/multer');
const controller = require('../../controllers/anexo.controller');
const { authorize, ADMIN } = require('../../middlewares/auth');

const upload = multer({
  storage,
  limits: { fileSize: fileMaxLimit },
  fileFilter: checkExt,
});

const router = express.Router();

router
  .route('/')
  /**
   * @api {get} v1/upload Get Anexo
   * @apiDescription Get Anexo information
   * @apiVersion 1.0.0
   * @apiName GetAnexo
   * @apiGroup Anexo
   * @apiPermission Anexo
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(authorize(), controller.list)
  /**
   * @api {post} v1/upload Replace Anexo
   * @apiDescription Replace the whole Anexo document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceAnexo
   * @apiGroup Anexo
   * @apiPermission Anexo
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only admins users can modify the data
   * @apiError (Forbidden 403)    Forbidden    Only admins can modify the data
   * @apiError (Not Found 404)    NotFound     Anexo does not exist
   */
  .post(authorize(), upload.array('anexos', 12), controller.create);

router
  .route('/:id')
/**
   * @api {get} v1/upload/:id Get Anexo
   * @apiDescription Get Anexo information
   * @apiVersion 1.0.0
   * @apiName GetAnexo
   * @apiGroup Anexo
   * @apiPermission Anexo
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     User does not exist
   */
  .get(authorize(), controller.get)
  /**
   * @api {patch} v1/upload/:id Delete Anexo
   * @apiDescription Delete a Anexo
   * @apiVersion 1.0.0
   * @apiName DeleteAnexo
   * @apiGroup Anexo
   * @apiPermission Anexo
   *
   * @apiHeader {String} Authorization   Anexo's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated Anexos can delete the data
   * @apiError (Forbidden 403)  Forbidden  Only Anexo with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Anexo does not exist
   */
  .patch(authorize(), upload.single('anexos'), controller.update)
/**
   * @api {put} v1/upload/:id Replace Anexos
   * @apiDescription Replace the whole Anexos document with a new one
   * @apiVersion 1.0.0
   * @apiName ReplaceAnexos
   * @apiGroup Anexos
   * @apiPermission Anexos
   *
   * @apiHeader {String} Authorization   Anexos's access token
   *
   * (You must be an admin to change the Anexos's role)
   *
   * @apiError (Bad Request 400)  ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401) Unauthorized Only authenticated Anexoss can modify the data
   * @apiError (Forbidden 403)    Forbidden Only Anexos with same id or admins can modify the data
   * @apiError (Not Found 404)    NotFound     Anexos does not exist
   */
  .put(authorize(), upload.single('anexos'), controller.replace)
  /**
   * @api {delete} v1/upload/:id Delete Anexo
   * @apiDescription Delete a Anexo
   * @apiVersion 1.0.0
   * @apiName DeleteAnexo
   * @apiGroup Anexo
   * @apiPermission Anexo
   *
   * @apiHeader {String} Authorization   Anexo's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated Anexos can delete the data
   * @apiError (Forbidden 403)  Forbidden   Only Anexo with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Anexo does not exist
   */
  .delete(authorize(), controller.delete);

module.exports = router;
