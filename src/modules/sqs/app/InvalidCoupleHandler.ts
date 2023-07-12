import 'reflect-metadata';
import { injectable } from 'inversify';
import type { SQSEvent } from 'aws-lambda';
import NormalizedEventBaseHandler from 'src/modules/infrastructure/app/NormalizedEventBaseHandler';

@injectable()
export default class InvalidCoupleHandler extends NormalizedEventBaseHandler<any> {
  protected async run(port?: SQSEvent): Promise<any> {
    return 'hola'
  }
}