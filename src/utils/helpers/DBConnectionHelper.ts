import 'reflect-metadata';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

// import DefChannel from "../../modules/Channel/Channel/domain/entity/DefChannel.model";
import Market from "../../modules/market/domain/entity/Market";
// import Property from "../../modules/Property/Property/domain/entity/Property.model";
// import Rateplan from "../../modules/Rateplan/Rateplan/domain/entity/Rateplan.model";
// import Room from "../../modules/Room/Room/domain/entity/Room.model";
// import RoomChannel from "../../modules/RoomChannel/RoomChannel/domain/entity/RoomChannel.model";

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
			entities: [Market],
			logging: true
		};
		return await new DataSource(dataSourceOptions).initialize();
	}
}
