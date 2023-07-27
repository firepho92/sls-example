import 'reflect-metadata'
import TYPES from 'src/TYPES';
import { SQSEvent } from 'aws-lambda';
import { inject } from 'inversify/lib/annotation/inject';
import Adapter from 'src/modules/infrastructure/adapter/Adapter';
import NormalizedEventBaseHandler from 'src/modules/infrastructure/controller/NormalizedEventBaseHandler';

export default class InvalidCoupleConsumerHandler1_0_0 extends NormalizedEventBaseHandler {
  constructor (
    @inject(TYPES.InvalidCoupleAdapter) private readonly adapter: Adapter<any, Promise<string>>
  ) {
    super();
  }
  protected run(port?: SQSEvent): Promise<any> {
    console.log('InvalidCoupleConsumerHandler1_0_0', JSON.stringify(port));
    return this.adapter.execute(port);
  }
}