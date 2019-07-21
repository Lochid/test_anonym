import { Request, Response, NextFunction } from "express";
import { bodyIsEmpty, loginIsEmpty, loginIsTooShort, loginIsTooLong, passwordIsEmpty, passwordIsTooShort, passwordIsTooLong, idIsEmpty, idLessThanZero } from "../../constants/errors";
import { RegistrationRequest, BanRequest } from "./users/models";


export function validateBody(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (body == undefined) {
        return res.status(400).send(bodyIsEmpty)
    }

    next();
}


export function validateLogin(req: Request, res: Response, next: NextFunction) {
    const body: RegistrationRequest = req.body;

    if (!body.login) {
        return res.status(400).send(loginIsEmpty)
    }

    if (body.login.length < 6) {
        return res.status(400).send(loginIsTooShort)
    }

    if (body.login.length > 256) {
        return res.status(400).send(loginIsTooLong)
    }

    next();
}

export function validatePassword(req: Request, res: Response, next: NextFunction) {
    const body: RegistrationRequest = req.body;

    if (!body.password) {
        return res.status(400).send(passwordIsEmpty)
    }

    if (body.password.length < 6) {
        return res.status(400).send(passwordIsTooShort)
    }

    if (body.password.length > 128) {
        return res.status(400).send(passwordIsTooLong)
    }

    next();
}

export function validateID(req: Request, res: Response, next: NextFunction) {
    const body: BanRequest = req.body;

    if (body.id == null) {
        return res.status(400).send(idIsEmpty)
    }

    if (body.id < 0) {
        return res.status(400).send(idLessThanZero)
    }
    next();
}


export const validateRegistrationRequest = [validateBody, validateLogin, validatePassword];
export const validateLoginRequest = [validateBody, validateLogin, validatePassword];
export const validateBanRequest = [validateBody, validateID];
