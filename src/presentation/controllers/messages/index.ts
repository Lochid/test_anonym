import { Request, Response, Router, IRoute } from "express";
import { IMessageService } from "../../../services/interfaces";
import { SendRequest } from "./models";
import { validateSendRequest } from "../validators";
import passport from "passport";
import { Server } from "socket.io";

export default class Messages {
    private router: Router;
    constructor(private messageService: IMessageService, socket: Server) {
        this.router = Router();
        this.router.post("/", validateSendRequest, passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => this.send(req, res));

        messageService.on("message", (message) => {
            socket.to('chat').emit("message", message);
        });
    }

    run(router: Router) {
        router.use("/messages", this.router);
    }

    async send(req: Request, res: Response) {
        try {
            const body: SendRequest = req.body;
            const message = await this.messageService.Send(req.user.id, body.conversation, body.text);

            res.send(JSON.stringify(message));
        } catch (e) {
            res.status(500).send(e)
        }
    }
}