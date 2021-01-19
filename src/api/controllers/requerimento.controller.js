const httpStatus = require('http-status');

const { uploadPath } = require('../../config/vars');
const Requerimento = require('../models/requerimento.model');
const { omit } = require('lodash');
const Anexo = require('../models/anexo.model');
const fs = require('fs/promises');
const path = require('path');
const ObjectId = require('mongodb').ObjectID;
/**
 * Get Requerimentos
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const { requerimentoId } = req.params;
    const requerimento = await Requerimento.findById(requerimentoId);
    if (!requerimento) {
      return res.status(httpStatus.NOT_FOUND).end();
    }
    res.status(httpStatus.OK);
    return res.json(requerimento);
  } catch (error) {
    next(error);
  }
};

/**
 * List Requerimentos
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const { page, perPage } = req.query || {};
    const requerimentos = await Requerimento.find({})
      .populate({
        path: 'userId',
        select: ['email', 'name', 'cpf', 'rg', 'matricula'],
        model: 'User',
      })
      .populate({
        path: 'curso',
        populate: {
          path: 'turno',
          model: 'Turno',
        },
        model: 'Curso',
      })
      .populate({
        path: 'tipoRequerimento',
        model: 'TipoRequerimento',
      })
      .limit(perPage * 1)
      .skip((page - 1) * perPage);

    res.status(httpStatus.OK);
    res.json(requerimentos);
  } catch (error) {
    next(error);
  }
};

/**
 * Create Requerimento
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const newRequerimento = new Requerimento(req.body);
    await newRequerimento.save();
    const savedRequerimento = await Requerimento.findById(newRequerimento._id);
    res.status(httpStatus.CREATED);
    res.json(savedRequerimento);
  } catch (error) {
    next(error);
  }
};

/**
 * Replace Requerimento
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { requerimentoId } = req.params;
    const requerimentoToUpdate = await Requerimento.findById(requerimentoId);
    if (!requerimentoToUpdate) {
      return res.status(httpStatus.NOT_FOUND).end();
    }
    const newRequerimento = new Requerimento(req.body);
    const newRequerimentoObj = omit(newRequerimento.toObject(), '_id');
    await requerimentoToUpdate.updateOne(newRequerimentoObj, { upsert: true, override: true });
    const updatedRequerimento = await Requerimento.findById(requerimentoToUpdate._id);
    res.status(httpStatus.OK);
    return res.json(updatedRequerimento);
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Requerimento
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { requerimentoId } = req.params;
    const requerimentoToUpdate = await Requerimento.findById(requerimentoId);
    if (!requerimentoToUpdate) {
      return res.status(httpStatus.NOT_FOUND).end();
    }
    const newRequerimento = new Requerimento(req.body);
    const newRequerimentoObj = omit(newRequerimento.toObject(), '_id');
    await requerimentoToUpdate.updateOne(newRequerimentoObj, { upsert: true, override: true });
    const updatedRequerimento = await Requerimento.findById(requerimentoToUpdate._id);
    res.status(httpStatus.OK);
    return res.json(updatedRequerimento);
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete Requerimento
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const { requerimentoId } =  req.params;
    const requerimentoToDelete = await Requerimento.findById(requerimentoId);
    if (!requerimentoToDelete) {
      return res.status(httpStatus.NOT_FOUND).end();
    }
    const anexoId = requerimentoToDelete.anexo;
    if (anexoId) {
      const anexosToDelete = await Anexo.findById(anexoId);
      if (anexosToDelete) {
        const file = anexosToDelete.anexoPath;
          try {
            const filePath = path.join(uploadPath, file);
            const exists = await fs.stat(filePath);
            if (exists) {
              await fs.unlink(filePath);
            }
          } catch (error) {
            console.log(error);
          }
      }
      await Anexo.findByIdAndDelete(anexoId);
    }
    await requerimentoToDelete.remove();
    return res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    console.log(error, 'error')
    return next(error);
  }
};
