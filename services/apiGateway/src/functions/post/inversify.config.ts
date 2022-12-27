import { Container } from 'inversify';
import TYPES from '../../../../../src/TYPES';
import Adapter from '../../../../../src/modules/common/adapter/Adapter';
import ApiGatewayPostAdapter from '../../../../../src/modules/apiGateway/adapter/ApiGatewayPostAdapter';
import ApiGatewayPostAdapterParams from '../../../../../src/modules/apiGateway/adapter/ApiGatewayPostAdapterParams';

const container: Container = new Container();

container.bind<Adapter<ApiGatewayPostAdapterParams, Promise<ApiGatewayPostAdapterParams>>>(TYPES.ApiGatewayAdapter).to(ApiGatewayPostAdapter);

export default container;