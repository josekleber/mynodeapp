const { fs } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const MongoRepository = require('../../repositories/implementation/mongo-repository');

class Login {
    constructor(){
        this.privateKeyFile = process.env.PRIVATEKEY || '';
        if (this.privateKeyFile === '') throw new Error('Private Key is undefined.');

        this.expireToken = process.env.EXPIRE_TOKEN || 1800;
    }

    async execute(userName, pwd) {

        const db = new MongoRepository();

        const privateKey = fs.readFileSync(this.privateKeyFile, 'utf8');

        // verificar se o usuario existe
        let userFound = await db.find({ userName });
        if (!userFound) throw new Error('User not found.');

        // verificar se está bloqueado
        if (userFound.isBlocked) throw new Error('user is blocked.');

        // comparar as senhas criptografadas
        const match = await bcrypt.compare(pwd, userFound.Password);
        if (!match) throw new Error('Authentication failed.');

        // gero o JWT
        const token =  jwt.sign({uid: userFound.Id}, privateKey, {
            expiresIn: this.expireToken,
            algorithm: "RS256"
        });
        
        return token;
    } 
}

module.exports = Login;