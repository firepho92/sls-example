import 'reflect-metadata';
import TYPES from './TYPES';
import middy from '@middy/core';
import eventNormalizerMiddleware from '@middy/event-normalizer';
// import sqsPartialBatchFailure from '@middy/sqs-partial-batch-failure';
import Handler from '../../../../../src/modules/infrastructure/app/Handler';
import container from './inversify.config';

export const main = middy(async (event: any): Promise<void> => {
  console.log('invalid', event);
  const handler =  container.get<Handler>(TYPES[event.version]);
  const response = await handler.execute(event);
});

main
  .use(eventNormalizerMiddleware());