const User = require('../../model/user');
const MongoRepository = require('../../repositories/implementation/mongo-repository');
const { validate } = require('secure-password-validator');
const bcrypt = require('bcrypt');
const { UserAlreadyExistError, WeakPasswordError } = require('../../utils/custom-error');


class RegisterUseCase {

    constructor() {

        const pwdOptions = {
            minLength: 8,
            digits: true,
            letters: true,
            uppercase: true,
            lowercase: true,
            symbols: true,
        }

        this.saltRounds = 10;
        
    }

    async execute(User){    

        const db = new MongoRepository();

        // verificar se o usuário existe na base.
        let foundUser = await db.find({ UserName: User.UserName });
        if (foundUser) throw new UserAlreadyExistError(User.UserName);

        // verificar se a senha está num padrão aceitável 
        const isPwdValid = await validate (User.Password, this.pwdOptions);
        if (!isPwdValid.valid) throw new WeakPasswordError('Senha não atende ao padrão mínimo de segurança.');
        
        // criptografar senha.
        let hashPwd = await bcrypt.hash(User.Password, this.saltRounds);

        // grava no banco
        User.Password = hashPwd;
        User.isBlocked = false;
        User.RegisterDate = new Date();

        return await db.save(User);

    }

}

module.exports = RegisterUseCase;