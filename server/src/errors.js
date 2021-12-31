class InvalidArgumentError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InvalidArgumentError';
    }
}
  
class InternalServerError extends Error {
    constructor(message) {
      super(message);
      this.name = 'InternalServerError';
    }
}

class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = 'NotFoundError';
    }
}

class DefineError {
    static getError (err, res) {
        if (err instanceof NotFoundError) {
            return res.status(404).json({ error:true, message: err.message });
        }else if (err instanceof InvalidArgumentError) {
            return res.status(422).json({ error:true, message: err.message });
        } else if (err instanceof InternalServerError) {
            return res.status(500).json({ error:true, message: err.message });
        } else {
            return res.status(500).json({ error:true, message: err.message });
        }
    }
}
  
module.exports = {
    DefineError: DefineError,
    InvalidArgumentError: InvalidArgumentError,
    NotFoundError: NotFoundError,
    InternalServerError: InternalServerError
}