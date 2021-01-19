const express = require('express');

const controller = require('../../controllers/email.controller');
const { authorize } = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/requerimento-status-changed')
  .post(authorize(), controller.create);

module.exports = router;
