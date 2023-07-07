import middy from '@middy/core';
import eventNormalizerMiddleware from '@middy/event-normalizer';
// import sqsPartialBatchFailure from '@middy/sqs-partial-batch-failure';

export const main = middy(async (event: any) => {
  console.log('invalid', event);
});

main
  .use(eventNormalizerMiddleware());