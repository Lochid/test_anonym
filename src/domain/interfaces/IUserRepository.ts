import { User } from "../core";

export default interface IUserRepository {
    Create(user: User): Promise<void>;
    ReadByLogin(login: string): Promise<User | undefined>;
    ReadByID(id: number): Promise<User | undefined>;
    Ban(id: number): Promise<void>;
}