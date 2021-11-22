import { Joi } from 'express-validation';

const UserValidator = {
    create: {
        body: Joi.object({
            code: Joi.string()
                .required(),
            name: Joi.string()
                .required(),
            birthday: Joi.string()
                .required()
        })
    },
    update: {
        body: Joi.object({
            id: Joi.number()
                .required(),
            code: Joi.string()
                .required(),
            name: Joi.string()
                .required(),
            birthday: Joi.string()
                .required(),
            isActive: Joi.boolean()
        })
    }
}

export { UserValidator };