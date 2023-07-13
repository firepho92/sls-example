import 'reflect-metadata';
import TYPES from './TYPES';
import middy from '@middy/core';
import versions from './versions';
import container from './inversify.config';
import eventNormalizerMiddleware from '@middy/event-normalizer';
// import sqsPartialBatchFailure from '@middy/sqs-partial-batch-failure';
import Handler from '../../../../../src/modules/infrastructure/app/Handler';
import httpRequestVersionHandlerMiddleware from '../../../../../src/middleware/httpRequestVersionHandlerMiddleware';

export const main = middy(async (event: any): Promise<void> => {
  console.log('invalid', event);
  const handler =  container.get<Handler>(TYPES[event.version]);
  const response = await handler.execute(event);
});

main
  .use(httpRequestVersionHandlerMiddleware(versions))
  .use(eventNormalizerMiddleware());