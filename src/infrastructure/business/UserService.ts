import {
    injectable,
    inject,
} from 'inversify';
import { User } from '../../domain/core';
import { IUserService } from '../../services/interfaces';
import { PASSWORD_HASHER, DATABASE } from '../../constants/identifiers';
import { IPasswordHasher } from '../../utils/interfaces';
import { IRepositoryPool, IUserRepository } from '../../domain/interfaces';
import { loginIsWrong, passwordIsWrong, userIsBanned } from '../../constants/errors';

@injectable()
export default class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(@inject(PASSWORD_HASHER) private passwordHasher: IPasswordHasher, @inject(DATABASE) repositoryPool: IRepositoryPool) {
        this.userRepository = repositoryPool.UserRepository();
    }

    async Registration(login: string, password: string): Promise<User | undefined> {
        const passwordHash = this.passwordHasher.generate(password);
        await this.userRepository.Create(new User(0, login, passwordHash, false));
        return this.userRepository.ReadByLogin(login);
    }

    async Login(login: string, password: string): Promise<User> {
        const user = await this.userRepository.ReadByLogin(login);
        if (user == null) {
            throw loginIsWrong;
        }
        if (user.banned) {
            throw userIsBanned;
        }

        if (!this.passwordHasher.verify(password, user.passwordHash)) {
            throw passwordIsWrong;
        }

        return user;
    }

    async ReadByID(id: number): Promise<User | undefined> {
        return this.userRepository.ReadByID(id);
    }

    async Ban(id: number): Promise<void> {
        return this.userRepository.Ban(id);
    }
}
