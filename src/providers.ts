import { Container } from 'inversify';
import { UserService } from './services/user.service';
import { Database } from './database-config';
import { FileService } from './services/file.service';

const ServicesCollection = new Container();

ServicesCollection.bind(Database).toSelf();

ServicesCollection.bind(UserService).toSelf();
ServicesCollection.bind(FileService).toSelf();

export { ServicesCollection };