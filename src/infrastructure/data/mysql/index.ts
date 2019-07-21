import mysql from "mysql";
import {
    injectable,
    inject
} from 'inversify';
import { CONFIG } from "../../../constants/identifiers";
import IConfig from "./config";
import { IRepositoryPool, IUserRepository } from "../../../domain/interfaces";
import UserRepository from "./UserRepository";

@injectable()
export class RepositoryPool implements IRepositoryPool {
    private userRepository: IUserRepository;

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

        this.userRepository = new UserRepository(connection);
    }
    
    UserRepository(): IUserRepository {
        return this.userRepository;
    }
}