import 'reflect-metadata';
import Handler from './Controller';
import { injectable } from 'inversify';
import { SQSEvent, SQSRecord } from 'aws-lambda/trigger/sqs';
import { PromiseStatus } from 'src/utils/enums/PromiseStatus';

//TODO: Renombrar a SQSEventBaseHandler
@injectable()
export default abstract class NormalizedEventBaseHandler implements Handler<SQSEvent, PromiseSettledResult<SQSRecord>[]> {
  constructor(){}

  protected abstract run(port?: SQSEvent): Promise<PromiseSettledResult<SQSRecord>[]>;

  async execute(port?: SQSEvent): Promise<PromiseSettledResult<SQSRecord>[]> {
    const items = await this.run(port);
    console.log('items', items);
    return items;
    // const processedRecords: PromiseSettledResult<SQSRecord>[] = port.Records.map((record, index) => {
    //   console.log('record', record, items[index]);
    //   return {
    //     status: items[index].status as PromiseStatus,
    //     value: record
    //   }
    //   // return !items.find((item) => {
    //   //   return item.status === PromiseStatus.FULFILLED && item.value === record;
    //   // });
    // });
    // // const retryItems = port.Records.filter((record) => {
      
    // // });
    // // console.log('Promise response', JSON.stringify(retryItems));
    // // return retryItems;
    // // port.Records.forEach((record) => {console.log('record.body', record.body)});
    // console.log('NormalizedEventBaseHandler', retryItems);
    // return retryItems;
  }
}