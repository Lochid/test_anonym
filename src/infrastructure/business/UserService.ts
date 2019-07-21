import {
    injectable,
    inject,
} from 'inversify';
import { User } from '../../domain/core';
import { IUserService } from '../../services/interfaces';
import { PASSWORD_HASHER, DATABASE } from '../../constants/identifiers';
import { IPasswordHasher } from '../../utils/interfaces';
import { IRepositoryPool, IUserRepository } from '../../domain/interfaces';

@injectable()
export default class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(@inject(PASSWORD_HASHER) private passwordHasher: IPasswordHasher, @inject(DATABASE) repositoryPool: IRepositoryPool) {
        this.userRepository = repositoryPool.UserRepository();
    }

    async Registration(login: string, password: string): Promise<User | undefined> {
        const passwordHash = this.passwordHasher.generate(password);
        await this.userRepository.Create(new User(0, login, passwordHash));
        return this.userRepository.ReadByLogin(login);
    }
}
