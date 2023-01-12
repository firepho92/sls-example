import 'reflect-metadata';
import { injectable } from "inversify";
import Adapter from "src/modules/common/adapter/Adapter";
import PropertyGetAdapterParams from './PropertyGetAdapterParams';
import Property from '../domain/entities/Property';

@injectable()
export default class PropertyGetAdapter implements Adapter<PropertyGetAdapterParams, Promise<Array<Property>>> {
  async execute(port: PropertyGetAdapterParams): Promise<Array<Property>> {
    return port
  }
}