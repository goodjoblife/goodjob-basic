class AuthenticationError extends Error {}

class NotFoundError extends Error {}

class UserInputError extends Error {}

module.exports = {
  AuthenticationError,
  NotFoundError,
  UserInputError,
};
