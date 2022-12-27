import 'reflect-metadata';
import https from 'http';
// const https = require('http');
import middy from '@middy/core'
import formatJSONResponse from '../../../../../src/utils/response/formatJSONResponse';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';

export const main = middy(async (event: any, context: any) => {
  // console.log('env', process.env);
  // console.log('context', context);
  // console.log('event', event.requestContext);

  // const options = {
  //     hostname: 'localhost',
  //     port: 8080,
  //     path: '/cache/SecretDBName',
  //     method: 'GET',
  //     headers: {
  //       'X-Aws-Parameters-Secrets-Token': process.env.AWS_SESSION_TOKEN
  //   },
  // }
  // const req = https.request(options, res => {
  //     res.on('data', d => {
  //         console.log('Response from cache: '+d);
  //         return d;
  //     })
  // });
  // req.on('error', error => {
  //     console.error(error)
  // });
  // req.end();
  return formatJSONResponse({
    event,
  }, 404);
});

main
  .use(httpResponseHandlerMiddleware());