class DomainError extends Error {
    constructor(message){
        super(message);
        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

class UserAlreadyExistError extends DomainError {
    constructor(user){
        super(`User ${user} was found. Cannot be duplicated.`);
        this.user = user;
    }
}

class WeakPasswordError extends DomainError {
    constructor(message){
        super(message);
    }
}

module.exports = {
    UserAlreadyExistError,
    WeakPasswordError,
}