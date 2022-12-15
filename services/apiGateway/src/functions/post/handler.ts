import 'reflect-metadata';
import middy from '@middy/core'
import { formatJSONResponse } from '../../../../../src/utils/response/formatJSONResponse';
import httpJsonBodyParser from '@middy/http-json-body-parser';

export const main = middy(async (event: any) => {
  return formatJSONResponse({
    event,
  });
});

main
  .use(httpJsonBodyParser());