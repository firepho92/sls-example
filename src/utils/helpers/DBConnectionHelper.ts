import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import entities from './Entities';

export default class DBConnectionHelper {
	async connect(url: any): Promise<DataSource> {
		const { dbname, port, password, host, username } = url;
		const dataSourceOptions: PostgresConnectionOptions = {
			type: 'postgres',
			host,
			username,
			password,
			database: dbname,
			port,
			namingStrategy: new SnakeNamingStrategy(),
			entities,
			logging: true
		};
		return await new DataSource(dataSourceOptions).initialize();
	}
}
