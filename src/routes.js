const express = require('express');
const router = express.Router();
const registerController = require('./feature/register/index');
const { userValidate } = require('./middleware/validator');

router
    .route('/')
    .get((req, res) => {
        res.status(200).send("aqui get");
    })


router
    .route('/register') 
    .post( userValidate, (req,res) => registerController.handle(req,res))


module.exports = router;