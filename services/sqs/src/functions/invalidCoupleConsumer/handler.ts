import 'reflect-metadata';
import TYPES from './TYPES';
import middy from '@middy/core';
import versions from './versions';
import container from './inversify.config';
import { SQSEvent, SQSRecord } from 'aws-lambda';
import eventNormalizerMiddleware from '@middy/event-normalizer';
// import sqsPartialBatchFailure from '@middy/sqs-partial-batch-failure';
import Handler from '../../../../../src/modules/infrastructure/app/Handler';
import normalizedRequestVersionHandlerMiddleware from '../../../../../src/middleware/normalizedRequestVersionHandlerMiddleware';

export const main = middy(async (event: any): Promise<SQSRecord[]> => {
  // console.log('invalid', event);
  const handler =  container.get<Handler<SQSEvent, SQSRecord[]>>(TYPES[event.version]);
  const response = await handler.execute(event);
  console.log('handler', response);
  return response;
});

main
  .use(normalizedRequestVersionHandlerMiddleware(versions))
  .use(eventNormalizerMiddleware());