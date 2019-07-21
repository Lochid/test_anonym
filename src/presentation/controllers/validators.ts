import { Request, Response, NextFunction } from "express";
import { bodyIsEmpty } from "../../constants/errors";


export function validateBody(req: Request, res: Response, next: NextFunction) {
    const body = req.body;
    if (body == undefined) {
        return res.status(400).send(bodyIsEmpty)
    }

    next();
}