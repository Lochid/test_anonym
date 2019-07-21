import {
    injectable,
} from 'inversify';
const config = require("../../config.json")

@injectable()
export default class Config {
    public database: {
        connectionLimit: number;
        host: string;
        user: string;
        password: string;
        database: string;
    }

    public network: {
        port: number;
    }

    public jwt: {
        secret: string
    }

    constructor() {
        this.database = config.database;
        this.network = config.network;
        this.jwt = config.jwt;
    }
}