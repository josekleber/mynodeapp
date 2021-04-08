const RegisterController = require('./controller');
const RegisterUseCase = require('./use-case');

const registerUseCase = new RegisterUseCase();
const registerController = new RegisterController(registerUseCase);


module.exports = registerController;