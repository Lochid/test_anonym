import { Request, Response, Router, IRoute } from "express";
import { IMessageService } from "../../../services/interfaces";
import passport from "passport";
import { ReadMessagesRequest } from "./models";

export default class Conversations {
    private router: Router;
    constructor(private messageService: IMessageService) {
        this.router = Router();
        this.router.get("/", passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => this.readConversationList(req, res));
        this.router.get("/:conversation", passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => this.readMessageList(req, res));
    }

    run(router: Router) {
        router.use("/conversations", this.router);
    }

    async readConversationList(req: Request, res: Response) {
        try {
            const conversations = await this.messageService.ReadConversationList();

            res.send(JSON.stringify(conversations));
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async readMessageList(req: Request, res: Response) {
        try {
            const body: ReadMessagesRequest = req.params;
            const messages = await this.messageService.ReadMessageList(body.conversation);

            res.send(JSON.stringify(messages));
        } catch (e) {
            res.status(500).send(e)
        }
    }
}