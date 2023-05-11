const { createHandler } = require('graphql-http/lib/use/express');
const Joi = require('joi');
const winston = require('winston');
const expressPlayground =
  require('graphql-playground-middleware-express').default;
const {
  AuthenticationError,
  NotFoundError,
  UserInputError,
} = require('../errors');

const GRAPHQL_ENDPOINT = '/graphql';

const defaultFormatError = (err) => {
  winston.warn('', { message: err.message, error: err });

  if (err.originalError instanceof AuthenticationError) {
    err.extensions.code = 'UNAUTHORIZED';
  } else if (err.originalError instanceof NotFoundError) {
    err.extensions.code = 'NOT_FOUND';
  } else if (err.originalError instanceof UserInputError) {
    err.extensions.code = 'BAD_USER_INPUT';
  } else if (err.originalError instanceof Joi.ValidationError) {
    err.extensions.code = 'BAD_USER_INPUT';
  }

  return err;
};

const setupGraphql = (app, { enablePlayground = false, ...handlerOpt }) => {
  if (enablePlayground === true) {
    app.get(
      GRAPHQL_ENDPOINT,
      expressPlayground({ endpoint: GRAPHQL_ENDPOINT })
    );
  }
  app.post(
    GRAPHQL_ENDPOINT,
    createHandler({ formatError: defaultFormatError, ...handlerOpt })
  );
};

module.exports = setupGraphql;
