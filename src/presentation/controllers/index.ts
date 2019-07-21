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
import { CONFIG } from '../../constants/identifiers';
import IConfig from './config';

@injectable()
export default class Controllers {
    constructor(@inject(CONFIG) private config: IConfig) {
    }

    async jwtAuth(jwt_payload: any, next: VerifiedCallback) {
        /*
        TODO: READING user

        if (user == undefined) {
            return next(idIsWrong, null);
        }

        if (user.banned) {
            return next(userIsBanned, null);
        }
        next(null, user);
*/

        next(null, {});

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

            /*
            TODO: READING user
    
            if (user == undefined) {
                return connection.disconnect();
            }
    
            if (user.banned) {
                return connection.disconnect();
            }
            next(null, user);
    */
        });

        server.listen(this.config.network.port, () => {
            console.log("Server started: ", this.config.network.port);
        });
    }
}
