import {
    injectable,
    inject,
} from 'inversify';
import http from "http";
import express from 'express';
import io from "socket.io";
import socketioJwt from "socketio-jwt";
import passport from "passport";
import passportJWT, { VerifiedCallback } from "passport-jwt";
import { CONFIG, USER_SERVICE, MESSAGE_SERVICE } from '../../constants/identifiers';
import IConfig from './config';
import { IUserService, IMessageService } from '../../services/interfaces';
import Users from './users';
import Auth from './auth';
import { idIsWrong, userIsBanned } from '../../constants/errors';
import Messages from './messages';
import Conversations from './conversations';

@injectable()
export default class Controllers {
    constructor(@inject(CONFIG) private config: IConfig, @inject(USER_SERVICE) private userService: IUserService, @inject(MESSAGE_SERVICE) private messageService: IMessageService) {
    }

    async jwtAuth(jwt_payload: any, next: VerifiedCallback) {
        const user = await this.userService.ReadByID(jwt_payload.id);

        if (user == undefined) {
            return next(idIsWrong, null);
        }

        if (user.banned) {
            return next(userIsBanned, null);
        }

        next(null, user);

    }

    run() {
        const ExtractJwt = passportJWT.ExtractJwt;
        const JwtStrategy = passportJWT.Strategy;
        const jwtOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.config.jwt.secret,
        }

        const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => this.jwtAuth(jwt_payload, next));


        passport.use(strategy);

        const app = express();
        app.use(passport.initialize());
        app.use(express.json());
        const server = http.createServer(app);
        const socket = io.listen(server);

        socket.on('connection', socketioJwt.authorize({
            secret: jwtOptions.secretOrKey,
            timeout: 15000
        } as any)).on('authenticated', async (connection: any) => {
            const user = await this.userService.ReadByID(connection.decoded_token.id);

            if (user == undefined) {
                return connection.disconnect();
            }

            if (user.banned) {
                return connection.disconnect();
            }
        });

        const users = new Users(this.config.jwt.secret, this.userService);
        const auth = new Auth(this.config.jwt.secret, this.userService);
        const conversations = new Conversations(this.messageService);
        const messages = new Messages(this.messageService, socket);

        users.run(app);
        auth.run(app);
        conversations.run(app);
        messages.run(app);



        server.listen(this.config.network.port, () => {
            console.log("Server started: ", this.config.network.port);
        });
    }
}
