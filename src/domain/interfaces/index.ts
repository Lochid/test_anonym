import IUserRepository from "./IUserRepository";

export interface IRepositoryPool {
    UserRepository(): IUserRepository;
}

export { default as IUserRepository } from "./IUserRepository";
