import { handlerPath } from '../../lib/handler-resolver';

export default {
  name: '${self:custom.func_prefix}-post',
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'ejemplo',
      },
    },
  ],
};