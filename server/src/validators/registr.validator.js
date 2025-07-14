const { body } = require('express-validator');

class RegistrValidate {
  static add() {
    return [
      body('name')
        .notEmpty()
        .withMessage('Name cannot be empty')
        .isString()
        .withMessage('Name must be a string'),
      body('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isString()
        .withMessage('Email must be a string')
        .isEmail()
        .withMessage('This in not a valid email'),
      body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 8 })
        .withMessage('Password must be a minimum of 8 characters'),
    ];
  }

  static login() {
    return [
      body('email')
        .notEmpty()
        .withMessage('Email cannot be empty')
        .isString()
        .withMessage('Email must be a string')
        .isEmail()
        .withMessage('This in not a valid email'),
      body('password')
        .notEmpty()
        .withMessage('Password cannot be empty')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 8 })
        .withMessage('Password must be a minimum of 8 characters'),
    ];
  }
}

module.exports = {RegistrValidate};
