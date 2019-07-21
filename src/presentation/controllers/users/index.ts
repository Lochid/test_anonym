import { Request, Response, Router } from "express";
import { sign } from "jsonwebtoken";
import { IUserService } from "../../../services/interfaces";
import { RegistrationRequest, RegistrationResponse, BanRequest } from "./models";
import { validateRegistrationRequest, validateBanRequest } from "../validators";
import passport from "passport";

export default class Users {
    private router: Router;

    constructor(private jwtSecret: string, private userService: IUserService) {
        this.router = Router();
        this.router.post("/", validateRegistrationRequest, (req: Request, res: Response) => this.registration(req, res));
        this.router.put("/", validateBanRequest, passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => this.ban(req, res));
    }

    run(router: Router) {
        router.use('/users', this.router);
    }

    async registration(req: Request, res: Response) {
        try {
            const body: RegistrationRequest = req.body;
            const user = await this.userService.Registration(body.login, body.password);
            let token: string | undefined = undefined;
            let response: RegistrationResponse | undefined = undefined;
            if (user != null) {
                token = sign({
                    id: user.id
                }, this.jwtSecret);
                response = {
                    id: user.id,
                    login: user.login
                }
            }

            res.send(JSON.stringify({
                token,
                user: response,
            }));
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async ban(req: Request, res: Response) {
        try {
            const body: BanRequest = req.body;
            await this.userService.Ban(body.id);
            res.send(JSON.stringify({}));
        } catch (e) {
            res.status(500).send(e)
        }
    }
}