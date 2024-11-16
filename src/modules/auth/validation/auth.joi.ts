import * as  Joi from "joi";

export const signup={
    body:Joi.object({
        name:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required(),
        cpassword:Joi.string().valid(Joi.ref('password')).required(),
        gender:Joi.string().valid('male','female').required()
    }).required()
}

export const signin={
    body:Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required(),

    }).required()
}