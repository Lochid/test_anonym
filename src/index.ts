import 'reflect-metadata';
import { Container } from "inversify";
import Config from './config/config';
import { CONFIG, DATABASE, USER_SERVICE, PASSWORD_HASHER, MESSAGE_SERVICE } from './constants/identifiers';
import { IRepositoryPool } from './domain/interfaces';
import { RepositoryPool } from './infrastructure/data/mysql';
import { IUserService, IMessageService } from './services/interfaces';
import UserService from './infrastructure/business/UserService';
import { IPasswordHasher } from './utils/interfaces';
import { PasswordHasher } from './utils/impls';
import Controllers from './presentation/controllers';
import { MessageService } from './infrastructure/business';

function startUp() {
    const diContainer = new Container();
    diContainer.bind<Config>(CONFIG).to(Config);

    diContainer.bind<IPasswordHasher>(PASSWORD_HASHER).to(PasswordHasher);
    diContainer.bind<IRepositoryPool>(DATABASE).to(RepositoryPool);
    
    diContainer.bind<IUserService>(USER_SERVICE).to(UserService);
    diContainer.bind<IMessageService>(MESSAGE_SERVICE).to(MessageService);
    diContainer.bind<Controllers>(Controllers).toSelf();
    
    const app = diContainer.resolve<Controllers>(Controllers);
    app.run();
}

startUp();
