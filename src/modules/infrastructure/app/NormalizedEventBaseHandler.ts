import 'reflect-metadata';
import Handler from './Handler';
import { injectable } from 'inversify';
import { SQSBatchResponse, SQSEvent } from 'aws-lambda';

@injectable()
export default abstract class NormalizedEventBaseHandler<T> implements Handler<SQSEvent, SQSBatchResponse> {
  constructor(){}

  protected abstract run(port?: SQSEvent): Promise<T>;

  async execute(port?: SQSEvent): Promise<SQSBatchResponse> {
    const response = await this.run(port);
    console.log('NormalizedEventBaseHandler')
    return null;
  }
}