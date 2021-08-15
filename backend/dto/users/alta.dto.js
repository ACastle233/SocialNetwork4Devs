const Joi = require('joi');

module.exports.altaUserDTO = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
});