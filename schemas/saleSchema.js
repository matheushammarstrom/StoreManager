const Joi = require('joi');

// module.exports = Joi.object({
//   quantity: Joi.number().positive().strict()
//   .required()
//   .messages({
//     'any.required': '400|"quantity" is required',
//     'number.base': '422|"quantity" must be a number',
//     'number.positive': '422|"quantity" must be greater than or equal to 1',
//   }),
//   productId: Joi.number().positive().strict().required()
//   .messages({
//     'any.required': '400|"quantity" is required',
//     'number.base': '422|"quantity" must be a number',
//   }),
// });

module.exports = Joi.array().items(Joi.object({
  productId: Joi.number().positive().strict().required()
  .messages({
    'any.required': '400|"productId" is required',
    'number.base': '422|"productId" must be a number',
  }),
  quantity: Joi.number().positive().strict()
  .required()
  .messages({
    'any.required': '400|"quantity" is required',
    'number.base': '422|"quantity" must be a number',
    'number.positive': '422|"quantity" must be greater than or equal to 1',
  }),
}));