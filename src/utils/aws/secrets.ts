import { SecretsManager } from 'aws-sdk';

import Exception from '../error/Exception';
import HttpStatusCode from '../enums/httpStatusCode';
import ErrorCode from '../error/errorCode';

/** Secrets module
 *
 */
export default class Secrets {
  private name = '';
  private client = null;
  private secrets = null;

  constructor() {
    this.name = process.env.SECRET_NAME;
  }

  async init() {
    this.client = new SecretsManager({ region: process.env.REGION });
    if (this.client) {
      const data = await this.client.getSecretValue({ SecretId: this.name }).promise();
      if ('SecretString' in data) {
        this.secrets = JSON.parse(data.SecretString);
      }
    } else {
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000, []);
    }
  }

  async get() {
    if (this.secrets == null) {
      await this.init();
    }
    return this.secrets;
  }
}
