import { Container } from 'inversify';
import TYPES from '../../../../../src/TYPES';
import Adapter from '../../../../../src/modules/common/adapter/Adapter';
import ApiGatewayAdapter from '../../../../../src/modules/apiGateway/adapter/ApiGatewayAdapter';
import ApiGatewayAdapterParams from '../../../../../src/modules/apiGateway/adapter/ApiGatewayAdapterParams';

const container: Container = new Container();

container.bind<Adapter<ApiGatewayAdapterParams, Promise<ApiGatewayAdapterParams>>>(TYPES.ApiGatewayAdapter).to(ApiGatewayAdapter);

export default container;