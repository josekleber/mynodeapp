const express = require('express');
const { WeakPasswordError, UserAlreadyExistError } = require('../../utils/custom-error');
class RegisterController {

    constructor(registerUseCase) {
        this.registerUseCase = registerUseCase;
    }

    async handle (req, res) {

        try {

            let body = req.body;

            let userRegistered = await this.registerUseCase.execute(body);

            //oculto a senha
            userRegistered.Password = '***';

            return res.status(201).json(userRegistered);
            
        } catch (error) {

            if (error instanceof UserAlreadyExistError || 
                error instanceof WeakPasswordError )
                return res.status(422).json({ error: error.message });

            return res.status(500).json({ error: error.message });

        }
    }
}

module.exports = RegisterController;