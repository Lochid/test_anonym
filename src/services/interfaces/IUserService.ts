import { User } from "../../domain/core";

export default interface IUserService {
    Registration(login: string, password: string):Promise<User | undefined>;
}