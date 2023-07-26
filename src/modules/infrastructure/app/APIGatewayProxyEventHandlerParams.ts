import { ValidationInput } from 'src/middleware/httpJoiValidatorMiddleware';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';

export default interface APIGatewayProxyEventHandlerParams {
  event: APIGatewayProxyEvent,
  validation: ValidationInput
}