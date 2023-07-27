import { Container } from 'inversify';
import ErrorCode from 'src/utils/error/errorCode';
import Exception from 'src/utils/error/Exception';
import HttpStatusCode from 'src/utils/enums/httpStatusCode';
import APIGatewayProxyEventBaseController from './APIGatewayProxyEventBaseController';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import EventBaseControllerFactory from './EventBaseControllerFactory';
import Handler from './Controller';

export default class APIGatewayEventBaseControllerFactory extends EventBaseControllerFactory<APIGatewayProxyEvent> {

  constructor(
    private readonly container: Container,
    private readonly event: APIGatewayProxyEvent,
    private readonly handlerTypes: { [key: string]: symbol }
  ) {
    super();
  }

    //Finds the version in the Accept header and sets default version if not found
  protected getVersion(event: APIGatewayProxyEvent): string {
    // console.log('event.headers', event.headers);
    const regex = /version=([\d.]+)/;
    const matches = event.headers['Accept'].match(regex);
    console.log('matches', matches);
    const version = matches ? matches.at(1) : 'Default';
    console.log('version', version);
    return version;
  }

  public getInstance(): Handler {
    // console.log('httpRequestVersionHandlerMiddleware');
    const version = this.getVersion(this.event);
    // if (!versions.includes(version)) throw new Exception(HttpStatusCode.BAD_REQUEST, [ErrorCode.ERR0017], []);
    // request.event.version = version;
    if (!Object.keys(this.handlerTypes).includes(version)) throw new Exception(HttpStatusCode.BAD_REQUEST, [ErrorCode.ERR0017], []);
    const handler: APIGatewayProxyEventBaseController = this.container.get<APIGatewayProxyEventBaseController>(this.handlerTypes[version]);
    return handler;
  }
}