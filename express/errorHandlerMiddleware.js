const winston = require('winston');
const Joi = require('joi');
const {
  AuthenticationError,
  NotFoundError,
  UserInputError,
} = require('../errors');

const parse = (err) => {
  if (err instanceof AuthenticationError) {
    return { status: 401, message: 'Unauthorized' };
  } else if (err.originalError instanceof NotFoundError) {
    return { status: 404, message: 'Not Found' };
  } else if (err.originalError instanceof UserInputError) {
    return { status: 400, message: 'Bad Request' };
  } else if (err.originalError instanceof Joi.ValidationError) {
    return { status: 400, message: 'Bad Request' };
  }
  return { status: 500, message: 'Internal Server Error' };
};

const errorHandlerMiddleware = () => {
  // eslint-disable-next-line no-unused-vars
  return (err, req, res, next) => {
    winston.warn('', {
      message: err.message,
      error: err,
    });

    const { status, message } = parse(err);
    res.status(status);
    res.send({
      message,
      error: {},
    });
  };
};

module.exports = errorHandlerMiddleware;
