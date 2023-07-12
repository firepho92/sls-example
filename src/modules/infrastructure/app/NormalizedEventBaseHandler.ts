import 'reflect-metadata';
import Handler from './Handler';
import Mapper from '../domain/mapper/Mapper';
import { injectable } from 'inversify';
import { SQSBatchResponse, SQSEvent } from 'aws-lambda';

@injectable()
export default abstract class NormalizedEventBaseHandler<T> implements Handler<SQSEvent, SQSBatchResponse> {
  constructor(
    protected apiGatewayResultMapperService: Mapper<T, SQSBatchResponse>
  ){}

  protected abstract run(port?: SQSEvent): Promise<T>;

  async execute(port?: SQSEvent): Promise<SQSBatchResponse> {
    const entityDto: T = await this.run(port);
    const response = this.apiGatewayResultMapperService.execute(entityDto);
    return response;
  }
}