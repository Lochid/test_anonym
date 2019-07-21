import 'reflect-metadata';
import { Container } from "inversify";
import Config from './config/config';
import { CONFIG, DATABASE } from './constants/identifiers';
import { IRepositoryPool } from './domain/interfaces';
import { RepositoryPool } from './infrastructure/data/mysql';
import Controllers from './presentation/controllers';

function startUp() {
    const diContainer = new Container();
    diContainer.bind<Config>(CONFIG).to(Config);

    diContainer.bind<IRepositoryPool>(DATABASE).to(RepositoryPool);
    
    diContainer.bind<Controllers>(Controllers).toSelf();
    
    const app = diContainer.resolve<Controllers>(Controllers);
    app.run();
}

startUp();
