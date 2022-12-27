import 'reflect-metadata';
import { injectable } from 'inversify';
import Adapter from 'src/modules/common/adapter/Adapter';
import ApiGatewayAdapterParams from './ApiGatewayPostAdapterParams';

@injectable()
export default class ApiGatewayAdapter implements Adapter<ApiGatewayAdapterParams, Promise<ApiGatewayAdapterParams>> {
  async execute(port?: ApiGatewayAdapterParams): Promise<ApiGatewayAdapterParams> {
    return port;
  }
}