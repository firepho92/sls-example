import { injectable } from 'inversify';
import { DataSource, QueryRunner } from 'typeorm';

import Exception from '../error/Exception';
import HttpStatusCode from '../enums/httpStatusCode';
import ErrorCode from '../error/errorCode';

import DBConnectionHelper from '../helpers/DBConnectionHelper';
import DBConnectionManager from './DBConnectionManager';
import Secrets from '../aws/secrets';

@injectable()
export default class DBConnectionManagerTypeORM implements DBConnectionManager {
  private queryRunner: QueryRunner;
  private connection: DataSource;
  private secrets: any;

  
  public async connect(): Promise<DataSource> {
    // tslint:disable-next-line:no-console
    try {
      console.log('🔌 ~ DBConnectionManager: Connect');
      if (process.env.IS_OFFLINE !== 'true') {
        if (!this.secrets) this.secrets = await (new Secrets()).get(); console.log(this.secrets);
      } else {
        this.secrets = {
          username: process.env.DB_POSTGRES_USERNAME,
          password: process.env.DB_POSTGRES_PASSWORD,
          host: process.env.DB_POSTGRES_HOST,
          port: process.env.DB_POSTGRES_PORT,
          dbname: process.env.DB_POSTGRES_NAME,
        };
        // console.log('Secrets', this.secrets)
      }

      if (!this.connection) {
        //const { dbname, port, password, host, username } = this.secrets;
        this.connection = await new DBConnectionHelper().connect(this.secrets);
      } else if (!this.connection.isInitialized) {
        await this.connection.initialize();
      }
      console.log('🔌 ~ DBConnectionManager: Connected');
      return this.connection;
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.error(error);
      throw error;
    }
  }

  private async beginTransaction(): Promise<QueryRunner> {
    try {
      console.log('🔌 ~ DBConnectionManager: Begin Transaction');
      await this.connect();

      if (!this.queryRunner || this.queryRunner.isReleased) {
        this.queryRunner = this.connection.createQueryRunner();
        await this.queryRunner.startTransaction();
      }

      console.log('🔌 ~ DBConnectionManager: Transaction created');
      return this.queryRunner;
    } catch (error) {
      console.error(error);
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0014], []);
    }
  }

  async getConnection(): Promise<DataSource> {
    return this.connection && this.connection.isInitialized ? this.connection : this.connect();
  }

  async getTransaction(): Promise<QueryRunner> {
    return this.queryRunner && !this.queryRunner.isReleased ? this.queryRunner : this.beginTransaction();
  }

  async getActiveConnection(): Promise<DataSource | QueryRunner> {
    return this.queryRunner && this.queryRunner.isTransactionActive ? this.getTransaction() : this.getConnection();
  }

  async endTransaction(): Promise<void> {
    try {
      console.log('🔌 ~ DBConnectionManager: End Transaction');
      await this.queryRunner?.release();
    } catch (error) {
      console.error(error);
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0015], []);
    }
  }

  async disconnect(): Promise<void> {
    try {
      console.log('🔌 ~ DBConnectionManager: Disconnect');
      await this.connection?.destroy();
    } catch (error) {
      console.error(error);
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, [ErrorCode.ERR0000], []);
    }
  }
}