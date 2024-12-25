const Joi = require('joi')

const produtosSchema = Joi.object({
    produtos: Joi.array().items({
        nome: Joi.string(),
        email: Joi.number(),
        password: Joi.string(),
        administrador: Joi.boolean(),
        _id: Joi.string()
    }),
   quantidade: Joi.number()
})

export default produtosSchema;