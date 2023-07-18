import 'reflect-metadata';
import TYPES from 'src/TYPES';
import type { SQSEvent } from 'aws-lambda';
import { inject, injectable } from 'inversify';
import Adapter from 'src/modules/infrastructure/adapter/Adapter';
import NormalizedEventBaseHandler from 'src/modules/infrastructure/app/NormalizedEventBaseHandler';
import { PromiseStatus } from 'src/utils/enums/promiseStatus';

@injectable()
export default class InvalidCoupleHandler extends NormalizedEventBaseHandler<any> {

  constructor(
    @inject(TYPES.InvalidCoupleAdapter) private adapter: Adapter<any, Promise<string>>
  ) {
    super();
  }

  protected async run(port?: SQSEvent): Promise<any> {
    console.log('InvalidCoupleHandler', JSON.stringify(port));
    const responses = port.Records.map(async (record) => {
      console.log('record', record);
      const response = await this.adapter.execute(record.body);
      return response;
    });
    const retryItems = (await Promise.allSettled(responses)).filter((item) => item.status === PromiseStatus.REJECTED);
    console.log('Promise response', JSON.stringify(retryItems));
    return retryItems;
  }
}