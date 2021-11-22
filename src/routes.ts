import { Router } from "express";
import { UsersController } from "./controllers/users.controller";
import { VERSION } from "../version";

const routes = Router();

routes.get('/', (req, res) => {
    res.json({
        name: 'IWF Develcode API',
        key: 'igorwfaoro-develcode-api',
        version: VERSION
    });
});

routes.use('/users', UsersController);

export { routes };