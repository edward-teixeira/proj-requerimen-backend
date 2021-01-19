const Curso = require('../models/curso.model');
const Turma = require('../models/turma.model');
const httpStatus = require('http-status');
const { omit } = require('lodash');

/**
 * Get turma by curso list
 * @public
 */
exports.get = async (req, res, next) => {
  try {
    const { cursoId, turmaId } = req.params;
    const curso = await Curso.findById(cursoId);
    if (!curso) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Curso não encontrado');
    }
    const turma = await Turma.findById(turmaId)
      .populate({
        path: 'curso',
        model: 'Curso'
      });

    if (!turma) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Não existe com o ID especificado');
    }
    res.status(httpStatus.OK);
    return res.json(turma);
  } catch (error) {
    return next(error);
  }
};

/**
 * Get turmas by curso list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const { cursoId } = req.params;
    const curso = await Curso.findById(cursoId);
    if (!curso) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Curso não encontrado');
    }
    const turmas = await Turma.find({ curso: cursoId })
      .populate({
        path: 'curso',
        model: 'Curso'
      });
    res.status(httpStatus.OK);
    return res.json(turmas);
  } catch (error) {
    return next(error);
  }
};

/**
 * Create new Turma
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const { cursoId } = req.params;
    const curso = await Curso.findById(cursoId)
    
    if (!curso) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Curso não encontrado');
    }
    const newTurma = new Turma(req.body);
    const turma = await newTurma.save();
    res.status(httpStatus.CREATED);
    return res.json(turma);
  } catch (error) {
    return next(error);
  }
};

/**
 * Update Turma
 * @public
 */
exports.update = async (req, res, next) => {
  try {
    const { cursoId, turmaId } = req.params;
    const curso = await Curso.findById(cursoId);
    if (!curso) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Curso não encontrado');
    }
    const turmaToUpdate = await Turma.findById(turmaId);
    if (!turmaToUpdate) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Turma não encontrado');
    }
    const updatedTurmaData = new Turma(req.body);
    const updatedTurmaObject = omit(updatedTurmaData.toObject(), '_id');
    await turmaToUpdate.updateOne(updatedTurmaObject, { upsert: true, override: true });
    const turmaUpdated = await Turma.findById(turmaId);
    res.status(httpStatus.CREATED);
    return res.json(turmaUpdated);
  } catch (error) {
    return next(error);
  }
};

/**
 * Replace Turma
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { cursoId, turmaId } = req.params;
    const curso = await Curso.findById(cursoId);
    if (!curso) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Curso não encontrado');
    }
    const turmaToUpdate = await Turma.findById(turmaId);
    if (!turmaToUpdate) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Turma não encontrado');
    }
    const updatedTurmaData = new Turma(req.body);
    const updatedTurmaObject = omit(updatedTurmaData.toObject(), '_id');
    await turmaToUpdate.updateOne(updatedTurmaObject, { upsert: true, override: true });
    const turmaUpdated = await Turma.findById(turmaId);
    res.status(httpStatus.CREATED);
    return res.json(turmaUpdated);
  } catch (error) {
    return next(error);
  }
};

/**
 * Delete Turma
 * @public
 */
exports.delete = async (req, res, next) => {
  try {
    const { cursoId, turmaId } = req.params;
    const curso = await Curso.exists({ _id: cursoId });
    if (!curso) {
      res.status(httpStatus.BAD_REQUEST);
      return res.json('Curso não encontrado');
    }
    const deletedTurma = await Turma.findByIdAndDelete(turmaId);
    if (!deletedTurma) {
      res.status(httpStatus.NOT_FOUND);
      return res.json('Turma não encontrada!');
    }
    return res.status(httpStatus.NO_CONTENT).end();
  } catch (error) {
    return next(error);
  }
};
