import { CustomException } from "./setup/custom.exception";

export class AlreadyExistsException extends CustomException {

    constructor(message: string = 'Already exists', statusCode = 400) {
        super(statusCode, message);
    }
}