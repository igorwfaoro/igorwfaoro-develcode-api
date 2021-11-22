import { Request, Response, NextFunction, Router } from "express";
import { ServicesCollection } from "../providers";
import { UserService } from "../services/user.service";
import { validate } from 'express-validation';
import { UserValidator } from "../validators/user.validator";

const UsersController = Router();

const userService = ServicesCollection.resolve(UserService);

UsersController.post(`/`, validate(UserValidator.create), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileImage = req.files ? req.files['profileImage'] : null;
        const input = JSON.parse(req.body.data);

        const user = await userService.create(input, profileImage);

        res.json(user);
    } catch (error) {
        next(error);
    }
});

UsersController.put(`/`, validate(UserValidator.update), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileImage = req.files ? req.files['profileImage'] : null;
        const input = JSON.parse(req.body.data);

        const user = await userService.update(input, profileImage);

        res.json(user);
    } catch (error) {
        next(error);
    }
});

UsersController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAll(req.query);
        res.json(users);
    } catch (error) {
        next(error);
    }
});

UsersController.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await userService.getById(Number(req.params.id));
        res.json(user);
    } catch (error) {
        next(error);
    }
});

UsersController.get('/codeExists/:code', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.codeExists(req.params.code);
        res.json(result);
    } catch (error) {
        next(error);
    }
});

export { UsersController };