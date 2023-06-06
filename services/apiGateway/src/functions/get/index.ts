import { handlerPath } from '../../lib/handler-resolver';
import type { AWS } from '@serverless/typescript';

const lambda: AWS['functions']['k'] = {
  name: '${self:custom.func_prefix}-get',
  handler: `${handlerPath(__dirname)}/handler.main`,
  tags: {
    Name: 'apiGateway-get'
  },
  events: [
    {
      http: {
        method: 'get',
        path: 'ejemplo',
      },
    },
  ],
  timeout: 240
};

export default lambda;