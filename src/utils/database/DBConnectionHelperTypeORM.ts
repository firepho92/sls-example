import 'reflect-metadata';
import TYPES from 'src/TYPES';
import entities from './Entities';
import { DataSource } from 'typeorm';
import SecretsBase from '../aws/SecretsBase';
import { inject } from 'inversify/lib/annotation/inject';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

//refactor this code
export default class DBConnectionHelperTypeORM {
	private dataSourceOptions?: PostgresConnectionOptions;

	constructor(
		@inject(TYPES.SecretsManager) private secretsManager: SecretsBase
	) {
		this.dataSourceOptions = {
			type: 'postgres',
      namingStrategy: new SnakeNamingStrategy(),
      entities,
      logging: true,
		}
	}

	async connect(): Promise<DataSource> {
		const credentials = await this.secretsManager.retrieveSecretValue<PostgresConnectionOptions>(process.env.SECRET_NAME ?? '');
		console.log('secret', credentials);
		this.dataSourceOptions = {
			...this.dataSourceOptions,
			...credentials
		}
		// const predefinedConnectionOptions: PostgresConnectionOptions = {
		// 	type: 'postgres',
		// 	namingStrategy: new SnakeNamingStrategy(),
		// 	entities,
		// 	logging: true
		// }

		// this.dataSourceOptions = {
		// 	...predefinedConnectionOptions,
		// 	host: process.env.DB_POSTGRES_HOST,
		// 	username: process.env.DB_POSTGRES_USERNAME,
		// 	password: process.env.DB_POSTGRES_PASSWORD,
		// 	database: process.env.DB_POSTGRES_NAME,
		// 	port: parseInt(process.env.DB_POSTGRES_PORT ?? '5432', 10)
		// };

		// this.dataSourceOptions = process.env.IS_OFFLINE !== 'true'
    // ? this.dataSourceOptions
    // : {
    //     ...this.dataSourceOptions,
    //     host: process.env.DB_POSTGRES_HOST,
    //     username: process.env.DB_POSTGRES_USERNAME,
    //     password: process.env.DB_POSTGRES_PASSWORD,
    //     database: process.env.DB_POSTGRES_NAME,
    //     port: parseInt(process.env.DB_POSTGRES_PORT ?? '5432', 10)
    //   };
		// const { dbname, port, password, host, username } = url;
		// const dataSourceOptions: PostgresConnectionOptions = {
		// 	type: 'postgres',
		// 	host,
		// 	username,
		// 	password,
		// 	database: dbname,
		// 	port,
		// 	namingStrategy: new SnakeNamingStrategy(),
		// 	entities,
		// 	logging: true
		// };
		return await new DataSource(this.dataSourceOptions).initialize();
	}
}
