const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi)


// joi request body validation.
export const authCredentialSchema = Joi.object().keys({
   
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(15).required(),

});