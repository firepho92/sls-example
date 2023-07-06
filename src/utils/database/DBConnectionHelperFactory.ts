import 'reflect-metadata';
import { Container } from 'inversify';
import DBConnectionHelper from './DBConnectionHelper';
import { injectable } from 'inversify/lib/annotation/injectable';
import DBConnectionHelperTypeORM from './DBConnectionHelperTypeORM';
import DBConnectionOfflineHelperTypeORM from './DBConnectionOfflineHelperTypeORM';
import EnvironmentHelper from '../helpers/EnvironmentHelper';

@injectable()
export default class DBConnectionHelperFactory {
  constructor(
    private container: Container
    ) {}
    
    public create(): DBConnectionHelper {
      const connectionHelperMap: { [key: string]: typeof DBConnectionOfflineHelperTypeORM | typeof DBConnectionHelperTypeORM } = {
        'local': DBConnectionOfflineHelperTypeORM,
        'staged': DBConnectionHelperTypeORM
      }
      const connectionHelperType = connectionHelperMap[EnvironmentHelper.MODE];
      return this.container.resolve<DBConnectionHelper>(connectionHelperType);
    }
}