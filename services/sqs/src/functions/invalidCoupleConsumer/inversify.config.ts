import TYPES from './TYPES';
import { Container } from 'inversify/lib/container/container';
import InvalidCoupleHandler from '../../../../../src/modules/sqs/app/InvalidCoupleHandler';

const container: Container = new Container();

container.bind(TYPES.Default).to(InvalidCoupleHandler);

export default container;