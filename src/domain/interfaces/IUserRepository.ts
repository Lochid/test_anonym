import { User } from "../core";

export default interface IUserRepository {
    Create(user: User): Promise<void>;
    ReadByLogin(login: string): Promise<User | undefined>;
}