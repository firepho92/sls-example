import { handlerPath } from '../../lib/handler-resolver';
import type { AWS } from '@serverless/typescript';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const lambda: AWS['functions']['k'] = {
  name: '${self:custom.func_prefix}-post',
  handler: `${handlerPath(__dirname)}/handler.main`,
  logRetentionInDays: 14,
  events: [
    {
      http: {
        method: 'post',
        path: 'ejemplo',
        cors: true,
      },
    },
  ],
};

export default lambda;