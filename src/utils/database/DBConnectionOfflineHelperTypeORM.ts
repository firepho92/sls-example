import 'reflect-metadata';
import entities from './Entities';
import { DataSource } from 'typeorm';
import DBConnectionHelper from './DBConnectionHelper';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { injectable } from 'inversify/lib/annotation/injectable';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';


@injectable()
export default class DBConnectionOfflineHelperTypeORM implements DBConnectionHelper {
	private dataSourceOptions: PostgresConnectionOptions;

	constructor() {
    this.dataSourceOptions = {
      type: 'postgres',
      namingStrategy: new SnakeNamingStrategy(),
      entities,
      logging: true,
      host: process.env.DB_POSTGRES_HOST,
      username: process.env.DB_POSTGRES_USERNAME,
      password: process.env.DB_POSTGRES_PASSWORD,
      database: process.env.DB_POSTGRES_NAME,
      port: parseInt(process.env.DB_POSTGRES_PORT ?? '5432', 10)
    };
  }

	async connect(): Promise<DataSource> {
		return await new DataSource(this.dataSourceOptions).initialize();
	}
}
