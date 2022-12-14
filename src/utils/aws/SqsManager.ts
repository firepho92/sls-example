import AWS from 'aws-sdk';
// import { SQSClient, AddPermissionCommand } from "@aws-sdk/sqs";
import SqsBase from './SqsBase';
import SqsMessage from 'src/modules/common/domain/dto/SqsMessage';
export default class SqsManager implements SqsBase {
  private sqsClient: AWS.SQS;

  constructor (
    region = process.env.REGION,
  ) {
    this.sqsClient = new AWS.SQS({ region, apiVersion: '2012-11-05' });
  }

  async sendMessage(sqsMessage: SqsMessage): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.sqsClient.sendMessage(sqsMessage, (error, response) => {
          if(error){
            reject(error);
          }
          else{
            console.log(response);
            resolve(response);
          }
        })
      });
    } catch (error) {
      console.log('SqsManager error', error);
      throw error;
    }
  }
}