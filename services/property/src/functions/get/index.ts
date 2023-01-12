import { handlerPath } from '../../lib/handler-resolver';

export default {
  name: '${self:custom.func_prefix}-get',
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'practica',
      },
    },
  ],
};