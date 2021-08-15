const Joi = require('joi');

module.exports.altaUserDTO = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    password: Joi.string().required()
});