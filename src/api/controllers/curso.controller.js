const Curso = require('../models/curso.model');
const Turma = require('../models/turma.model');
const httpStatus = require('http-status');
const { omit } = require('lodash');

/**
 * Get Curso
 * @public
 */
exports.get = async (req, res) => {
  const curso = await Curso.findById(req.params.cursoId);

  if (!curso) {
    res.status(httpStatus.NOT_FOUND);
    return res.json('Curso não existe');
  }
  res.status(httpStatus.OK);
  return res.json(curso);
};

/**
 * Get curso list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const cursos = await Curso
      .find(req.query)
      .populate( {
        path: 'turma',
        model: 'Turma'
      }
      );
    res.status(httpStatus.OK);
    return res.json(cursos);
  } catch (error) {
    return next(error);
  }
};

/**
 * Replace existing curso
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const cursoToUpdate = await Curso.findById(req.params.cursoId);
    if (!cursoToUpdate) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Curso não encontrado');
    }
    const updatedCurso = new Curso(req.body);
    const cursoObject = omit(updatedCurso.toObject(), '_id');
    await cursoToUpdate.updateOne(cursoObject, { override: true, upsert: true });
    const curso = await Curso.findById(cursoToUpdate._id);
    res.status(httpStatus.OK);
    return res.json(curso);
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new Curso
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const curso = new Curso(req.body);
    const savedCurso = await curso.save();
    res.status(httpStatus.CREATED);
    res.json(savedCurso);
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing curso
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const cursoToUpdate = await Curso.findById(req.params.cursoId);
    if (!cursoToUpdate) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Curso não encontrado');
    }
    const updatedCurso = new Curso(req.body);
    const cursoObject = omit(updatedCurso.toObject(), '_id');
    await cursoToUpdate.updateOne(cursoObject, { override: true, upsert: true });
    const curso = await Curso.findById(cursoToUpdate._id);
    res.status(httpStatus.OK);
    return res.json(curso);
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete curso
 * @public
 */
exports.remove = async (req, res, next) => {
  try {
    const { cursoId } = req.params;
    const cursoToUpdate = await Curso.exists({ _id: cursoId });
    if (!cursoToUpdate) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Curso não encontrado');
    }
    const deletedCurso = await Curso.findByIdAndDelete(cursoId);
    await Turma.deleteMany({ curso: deletedCurso._id });
    return res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};
