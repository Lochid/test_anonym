import IUserRepository from "./IUserRepository";
import IMessageRepository from "./IMessageRepository";

export interface IRepositoryPool {
    UserRepository(): IUserRepository;
    MessageRepository(): IMessageRepository;
}

export { default as IUserRepository } from "./IUserRepository";
export { default as IMessageRepository } from "./IMessageRepository";
