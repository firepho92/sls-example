import 'reflect-metadata';
import { injectable, unmanaged } from 'inversify';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import DBConnectionManager from '../../../../shared/database/DBConnectionManager';
import Warning from '../../../../shared/error/Warning';
import ErrorCode from '../../../../shared/error/ErrorCode';
import Exception from '../../../../shared/error/Exception';
import HttpStatusCode from '../../../../shared/enums/httpStatusCode';
import PostgresSQLErrorCodes from '../../../../shared/enums/PostgresSQLErrorCodes';

export type ObjectType<V> = { new (): V } | Function; // eslint-disable-line
@injectable()
export default abstract class SoftDeleteOneByIdBaseRepository<T,V> {
    private type: ObjectType<V>;
    protected iDBConnectionManager : DBConnectionManager;

    constructor(@unmanaged() type: ObjectType<V>, @unmanaged() iDBConnectionManager: DBConnectionManager){
        this.type = type;
        this.iDBConnectionManager = iDBConnectionManager;
    }

    public async execute(id: T, username?: String): Promise<void> {
        try {
            const item = {
                active: false,
                updatedBy: username,
            } as V;    
            const connection: DataSource = await this.iDBConnectionManager.connect();
            //build query
            const query: SelectQueryBuilder<V> = connection.manager.createQueryBuilder(this.type, 'entity');
            await query
                .update(this.type)
                .set(item)
                .where('id = :id', { id })
                //Execute the query
                .execute();
    
        } catch (error) {
            console.log('Error:',error);
            if (error.code === PostgresSQLErrorCodes.FOREIGN_KEY_VIOLATION)
              throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.ERR0001);
            if (error.code === PostgresSQLErrorCodes.INVALID_TEXT_REPRESENTATI)
              throw new Warning(HttpStatusCode.BAD_REQUEST, [], ErrorCode.ERR0008);
            throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000, []);                  
        }
    }

}