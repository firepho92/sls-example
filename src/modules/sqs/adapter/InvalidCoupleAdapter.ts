import 'reflect-metadata';
import { injectable } from 'inversify';
import Adapter from '../../infrastructure/adapter/Adapter';

@injectable()
export default class InvalidCoupleAdapter implements Adapter<any, Promise<string>> {
  async execute(port?: any): Promise<string> {
    // console.log('InvalidCoupleAdapter', JSON.stringify(port));
    return 'hola'
  }
}