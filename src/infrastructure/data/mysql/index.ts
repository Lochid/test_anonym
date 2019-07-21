import mysql from "mysql";
import {
    injectable,
    inject
} from 'inversify';
import { CONFIG } from "../../../constants/identifiers";
import IConfig from "./config";
import { IRepositoryPool } from "../../../domain/interfaces";

@injectable()
export class RepositoryPool implements IRepositoryPool {

    constructor(@inject(CONFIG) config: IConfig) {
        const {
            host,
            user,
            password,
            database
        } = config.database;
        const connection = mysql.createConnection({
            host,
            user,
            password,
            database,
        });

        connection.connect();

    }

}