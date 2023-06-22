import middy from '@middy/core';

export const main = middy(async (event: any) => {
  console.log('invalid', event);
});