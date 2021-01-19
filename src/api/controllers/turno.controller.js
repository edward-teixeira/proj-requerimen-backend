const httpStatus = require('http-status');
const Turno = require('../models/turno.model');

exports.create = async (req, res, next) => {
  try {
    const turno = new Turno(req.body);
    const createdTurno = await turno.save();
    res.status(httpStatus.CREATED);
    res.json(createdTurno);
  } catch (error) {
    next(error);
  }
};

exports.list = async (req, res, next) => {
  try {
    const turnos = await Turno.find(req.query);
    res.status(httpStatus.CREATED);
    res.json(turnos);
  } catch (error) {
    next(error);
  }
};
