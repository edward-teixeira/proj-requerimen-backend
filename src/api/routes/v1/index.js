const express = require('express');

const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const cursoRoutes = require('./curso.route');
const miscRoutes = require('./misc.route');
const uploadRoutes = require('./upload.route');
const requerimentoRoutes = require('./requerimento.route');
const emailRoutes = require('./email.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));

/**
 * v1 routes
 */
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/cursos', cursoRoutes);
router.use('/misc', miscRoutes);
router.use('/requerimentos', requerimentoRoutes);
router.use('/upload', uploadRoutes);
router.use('/email', emailRoutes);

module.exports = router;
