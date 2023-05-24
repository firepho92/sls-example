import { handlerPath } from '../../lib/handler-resolver';
import type { AWS } from '@serverless/typescript';

const lambda: AWS['functions']['k'] = {
  name: '${self:custom.func_prefix}-get',
  handler: `${handlerPath(__dirname)}/handler.main`,
  tags: {
    Name: 'apiGateway-get'
  },
  events: [
    // {
    //   http: {
    //     method: 'get',
    //     path: 'v1/ejemplo',
    //   },
    // },
    {
      sqs: {
        arn: 'arn:aws:sqs:us-east-1:427784172992:dev-cdk-aws-infra-PaginatedExample-sqs.fifo',
        batchSize: 1
      }
    }
  ],
  timeout: 240
};

export default lambda;