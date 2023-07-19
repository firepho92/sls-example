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
    // const retryItems = response.filter((record) => {
    //   return !items.find((item) => {
    //     return item.status === PromiseStatus.FULFILLED && item.value === record;
    //   });
    // });
    // const retryItems = port.Records.filter((record) => {
      
    // });
    // console.log('Promise response', JSON.stringify(retryItems));
    // return retryItems;
    // port.Records.forEach((record) => {console.log('record.body', record.body)});
    console.log('NormalizedEventBaseHandler');
    return null;
  }
}