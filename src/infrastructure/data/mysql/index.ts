import mysql from "mysql";
import {
    injectable,
    inject
} from 'inversify';
import { CONFIG } from "../../../constants/identifiers";
import IConfig from "./config";
import { IRepositoryPool, IUserRepository, IMessageRepository } from "../../../domain/interfaces";
import UserRepository from "./UserRepository";
import MessageRepository from "./MessageRepository";

@injectable()
export class RepositoryPool implements IRepositoryPool {
    private userRepository: IUserRepository;
    private messageRepository: IMessageRepository;

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
        this.messageRepository = new MessageRepository(connection);
    }
    
    UserRepository(): IUserRepository {
        return this.userRepository;
    }
    
    MessageRepository(): IMessageRepository {
        return this.messageRepository;
    }
}