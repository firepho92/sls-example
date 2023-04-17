import { handlerPath } from '../../lib/handler-resolver';

export default {
  name: '${self:custom.func_prefix}-post',
  handler: `${handlerPath(__dirname)}/handler.main`,
  tags: {
    Name: 'apiGateway-post'
  },
  events: [
    {
      http: {
        method: 'post',
        path: 'ejemplo',
      },
    },
  ],
};