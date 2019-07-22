import { Request, Response, Router } from "express";
import { sign } from "jsonwebtoken";
import { IUserService } from "../../../services/interfaces";
import { LoginRequest } from "./models";
import { validateLoginRequest } from "../validators";
import { loginIsWrong, passwordIsWrong, userIsBanned } from "../../../constants/errors";

export default class Auth {
    private router: Router;
    constructor(private jwtSecret: string, private userService: IUserService) {
        this.router = Router();
        this.router.post("/", validateLoginRequest, (req: Request, res: Response) => this.login(req, res));
    }

    run(router: Router) {
        router.use("/conversations", this.router);
    }

    async login(req: Request, res: Response) {
        try {
            const body: LoginRequest = req.body;
            const user = await this.userService.Login(body.login, body.password);
            const token = sign({
                id: user.id
            }, this.jwtSecret);

            const response = {
                id: user.id,
                login: user.login
            }

            res.send(JSON.stringify({
                token,
                user: response,
            }));
        } catch (e) {
            if (e == loginIsWrong || e == passwordIsWrong) {
                return res.status(400).send(e)
            }
            if (e == userIsBanned) {
                return res.status(451).send(e)
            }

            res.status(500).send(e)
        }
    }
}