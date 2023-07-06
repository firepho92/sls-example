import SecretsBase from './SecretsBase';
import { injectable } from 'inversify/lib/annotation/injectable';
import { SecretsManagerClient, GetSecretValueCommand, GetSecretValueCommandInput } from '@aws-sdk/client-secrets-manager';

@injectable()
export default class SecretsManager implements SecretsBase {
  private secretsManagerClient: SecretsManagerClient;

  constructor(
    region = process.env.REGION,
  ) {
    this.secretsManagerClient = new SecretsManagerClient({ region });
  }

  async retrieveSecretValue(secretName: string): Promise<any> {
    const commandInput: GetSecretValueCommandInput = {
      SecretId: secretName
    }

    const secret = await this.secretsManagerClient.send(new GetSecretValueCommand(commandInput));
    return secret;
  }
}