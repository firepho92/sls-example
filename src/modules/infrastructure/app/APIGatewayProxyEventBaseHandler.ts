import 'reflect-metadata';
import Handler from './Handler';
import { injectable } from 'inversify';
import Mapper from '../domain/mapper/Mapper';
import APIGatewayResult from '../domain/dto/APIGatewayResult';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import httpJoiValidatorMiddleware from 'src/middleware/httpJoiValidatorMiddleware';
import APIGatewayProxyEventHandlerParams from './APIGatewayProxyEventHandlerParams';

@injectable()
export default abstract class APIGatewayProxyEventBaseHandler<T=object> implements Handler<APIGatewayProxyEventHandlerParams, APIGatewayResult<T>> {
  constructor(
    protected apiGatewayResultMapperService: Mapper<T, APIGatewayResult<T>>
  ){}

  protected abstract run(port?: APIGatewayProxyEvent): Promise<T>;

  async execute(port?: APIGatewayProxyEventHandlerParams): Promise<APIGatewayResult<T>> {
    // console.log('APIGatewayProxyEventBaseHandler', port);
    httpJoiValidatorMiddleware(port.validation);
    const entityDto: T = await this.run(port.event);
    const response = this.apiGatewayResultMapperService.execute(entityDto);
    return response;
  }
}