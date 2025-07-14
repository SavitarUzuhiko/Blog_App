const { validationResult } = require("express-validator");
const {RegistrValidate} = require("./registr.validator.js");

const expressValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const messages = errors.array().map(error => error.msg);
  return res.status(400).json({ success: false, msg: messages });
}

module.exports = { expressValidate , RegistrValidate };
