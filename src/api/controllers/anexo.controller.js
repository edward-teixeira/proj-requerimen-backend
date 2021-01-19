const httpStatus = require('http-status');
const fs = require('fs/promises');
const path = require('path');

const { uploadPath } = require('../../config/vars');
const Anexo = require('../models/anexo.model');
const { omit } = require('lodash');


const omitFields = ['createdAt', 'updatedAt', '__v'];
/**
 * Get Anexo
 * @public
 */
exports.get = async (req, res) => {
  const { id } = req.params;
  const anexo = await Anexo.findById(id);
  const anexoObj = omit(anexo.toObject(), omitFields);
  res.status(httpStatus.CREATED);
  res.json(anexoObj);
};

/**
 * List Anexo
 * @public
 */
exports.list = async (req, res) => {
  const anexos = await Anexo.find(req.query);
  const anexosObj = anexos.map(a => omit(a.toObject(), omitFields));
  res.status(httpStatus.OK);
  res.json(anexosObj);
};

/**
 * Post Anexo
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const { files } = req;
    const anexoPaths = files.map(f => f.filename);
    const anexoDocs = anexoPaths.map(p => new Anexo({ anexoPath: p }));
    const result = await Anexo.insertMany(anexoDocs);
    const ids = result.map(it => it._id);
    res.status(httpStatus.CREATED);
    res.json(ids);
  } catch (error) {
    console.log(error, 'errror');
    next(error);
  }
};

/**
 * Update Anexo
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { file } = req;
    const anexo = await Anexo.findById(id);
    if (!anexo) {
      return res.status(httpStatus.NOT_FOUND).end();
    }
    const newFile = new Anexo({ anexoPath: file.filename });
    const newFileObject = omit(newFile.toObject(), '_id');
    const filePath = path.join(uploadPath, anexo.anexoPath);
    const exists = (await fs.stat(filePath)).isFile();
    if (!exists) {
      return res.status(httpStatus.BAD_REQUEST).end();
    }
    // Delete file
    await fs.unlink(filePath);
    await anexo.updateOne(newFileObject, { upsert: true, override: true });
    const updatedAnexo = await Anexo.findById(anexo._id);
    res.status(httpStatus.OK);
    return res.json(updatedAnexo);
  } catch (error) {
    return next(error);
  }
};

/**
 * Replace Anexo
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { file } = req;
    const anexo = await Anexo.findById(id);
    if (!anexo) {
      return res.status(httpStatus.NOT_FOUND).end();
    }
    const newFile = new Anexo({ anexoPath: file.filename });
    const newFileObject = omit(newFile.toObject(), '_id');
    const filePath = path.join(uploadPath, anexo.anexoPath);
    const exists = (await fs.stat(filePath)).isFile();
    if (!exists) {
      return res.status(httpStatus.BAD_REQUEST).end();
    }
    await fs.unlink(filePath);
    await anexo.updateOne(newFileObject, { upsert: true, override: true });
    const updatedAnexo = await Anexo.findById(anexo._id);
    res.status(httpStatus.OK);
    return res.json(updatedAnexo);
  } catch (error) {
    return next(error);
  }
};

/**
 * delete Anexo
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const anexo = await Anexo.findById(id);
    if (!anexo) {
      return res.status(httpStatus.NOT_FOUND).end();
    }
    const filePath = path.join(uploadPath, anexo.anexoPath);
    const exists = (await fs.stat(filePath)).isFile();
    if (exists) {
      await fs.unlink(filePath);
    }
    await anexo.remove();
    return res.status(httpStatus.OK).end();
  } catch (error) {
    return next(error);
  }
};
