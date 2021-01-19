const httpStatus = require('http-status');
const TipoRequerimento = require('../models/tipoRequerimento.model');
const { omit } = require('lodash');


/**
 * List All TipoRequerimento
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const list = await TipoRequerimento.find(req.query);
    res.status(httpStatus.OK);
    return res.json(list);
  } catch (error) {
    return next(error);
  }
};

/**
 * Get By ID TipoRequerimento
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tRequerimento = await TipoRequerimento.findById(id);
    if (!tRequerimento) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Tipo de Requerimento informado não existe');
    }
    res.status(httpStatus.OK);
    return res.json(tRequerimento);
  } catch (error) {
    return next(error);
  }
};

/**
 * Create TipoRequerimento
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const newTRequerimento = new TipoRequerimento(req.body);
    await newTRequerimento.save();
    res.status(httpStatus.CREATED);
    res.json(newTRequerimento);
  } catch (error) {
    next(error);
  }
};

/**
 * Update TipoRequerimento
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    console.log(req.user, 'req.user');
    const { id } = req.params;
    const toUpdate = await TipoRequerimento.findById(id);
    if (!toUpdate) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('TipoRequerimento não existe');
    }
    const newTRequerimento = new TipoRequerimento(req.body);
    const newTRequerimentoObj = omit(newTRequerimento.toObject(), '_id');
    await toUpdate.updateOne(newTRequerimentoObj, { upsert: true, override: true });
    const updated = await TipoRequerimento.findById(toUpdate._id);
    res.status(httpStatus.OK);
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

/**
 * Replace TipoRequerimento
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const toUpdate = await TipoRequerimento.findById(id);
    if (!toUpdate) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('TipoRequerimento não existe');
    }
    const newTRequerimento = new TipoRequerimento(req.body);
    const newTRequerimentoObj = omit(newTRequerimento.toObject(), '_id');
    await toUpdate.updateOne(newTRequerimentoObj, { upsert: true, override: true });
    const updated = await TipoRequerimento.findById(id);
    res.status(httpStatus.OK);
    return res.json(updated);
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete TipoRequerimento
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const toDelete = await TipoRequerimento.exists({ _id: id });
    if (!toDelete) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('TipoRequerimento não existe');
    }
    await TipoRequerimento.findByIdAndDelete(id);
    return res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};
