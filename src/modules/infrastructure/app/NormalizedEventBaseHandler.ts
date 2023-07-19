import 'reflect-metadata';
import Handler from './Handler';
import { injectable } from 'inversify';
import { SQSEvent, SQSRecord } from 'aws-lambda/trigger/sqs';
import { PromiseStatus } from 'src/utils/enums/PromiseStatus';

//TODO: Renombrar a SQSEventBaseHandler
@injectable()
export default abstract class NormalizedEventBaseHandler<T={}, U={}, V={}> implements Handler<SQSEvent, SQSRecord[] | V> {
  constructor(){}

  protected abstract run(port?: SQSEvent): Promise<PromiseSettledResult<SQSRecord>[]>;

  async execute(port?: SQSEvent): Promise<SQSRecord[] | V> {
    const items = await this.run(port);
    console.log('items', items);
    const retryItems = port.Records.filter((record) => {
      return !items.find((item) => {
        return item.status === PromiseStatus.FULFILLED && item.value === record;
      });
    });
    // const retryItems = port.Records.filter((record) => {
      
    // });
    // console.log('Promise response', JSON.stringify(retryItems));
    // return retryItems;
    // port.Records.forEach((record) => {console.log('record.body', record.body)});
    console.log('NormalizedEventBaseHandler', retryItems);
    return retryItems;
  }
}