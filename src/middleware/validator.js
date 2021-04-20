const { body, validationResult } = require('express-validator');

const userValidate = [
    body('Name','Body must have Name property').exists(),
    body('Name','Property Name must be an String').isString(),
    body('UserName','Body must have UserName property').exists(),
    body('UserName','Property UserName must be an String').isString(),
    body('UserName', 'Property UserName must have 5 character').isLength({ min: 5}),
    body('Password','Body must have Password property').exists(),
    body('Password','Property Password must be an String').isString(),
    body('Email','Body must have Email property').exists(),
    body('Email','Property Email must be an Email').isEmail(),
    (req, res, next) => {
        const erros  = validationResult(req);
        if (!erros.isEmpty())
            return res.status(422).json({error: erros.array()});
        next();
    }
]

const loginValidate = [
    body('UserName','Body must have UserName property').exists(),
    body('Password','Body must have Password property').exists(),
    (req, res, next) => {
        const erros  = validationResult(req);
        if (!erros.isEmpty())
            return res.status(422).json({error: erros.array()});
        next();
    }
]

module.exports = { userValidate, loginValidate };