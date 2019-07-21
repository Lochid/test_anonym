import { User } from "../../domain/core";

export default interface IUserService {
    Registration(login: string, password: string):Promise<User | undefined>;
    Login(login: string, password: string):Promise<User>;
    Ban(id: number): Promise<void>;
}