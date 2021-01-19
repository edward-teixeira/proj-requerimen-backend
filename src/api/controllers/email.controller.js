const httpStatus = require('http-status');
const emailService = require('../services/emailService');


exports.create = async (req, res, next) => {
  try {
    const { statusChange, userName, receiver } = req.body;
    await emailService.send(statusChange, userName, receiver);
    res.status(httpStatus.OK).end();
  } catch (error) {
    console.log(error ,'error')
    next(error);
  }
};
