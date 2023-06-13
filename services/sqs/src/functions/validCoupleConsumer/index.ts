import type { AWS } from '@serverless/typescript';
import { handlerPath } from '../../lib/handler-resolver';

const lambda: AWS['functions']['k'] = {
  name: '${self:custom.func_prefix}-valid-couple-consumer',
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: '${env:SqsDemoSingleExampleSQSArn}',
        batchSize: 1,
        filterPatterns: [
          {
            body: {
              type: ['valid'],
            },
          }
        ]
      },
    },
  ],
};

export default lambda;