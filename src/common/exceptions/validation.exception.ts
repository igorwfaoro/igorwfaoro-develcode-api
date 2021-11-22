import { CustomException } from "./setup/custom.exception";

export class ValidationException extends CustomException {

    constructor(message: string = 'Validation error', statusCode = 400) {
        super(statusCode, message);
    }
}