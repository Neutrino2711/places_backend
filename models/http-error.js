class HttpError extends Error {
    constructor(message, errorCode) {
        super(message); //super->base class Adds a message property
        this.code = errorCode;
    }
}

module.exports = HttpError;