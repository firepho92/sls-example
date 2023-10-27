import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "clv-template-sns-subscription",
  frameworkVersion: "3",
  provider: {
    name: "aws",
    runtime: "nodejs16.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000"
    },
    deploymentBucket: {
      name: '${ssm:s3_bucket_deploy_sls, "s3_bucket_deploy_sls"}'
    },
    iam: {
      role: '${env:iamRole, "iamRole"}'
    }
  },
  resources: {
    Resources: {
      WebhookSubscriptionA: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          TopicArn: '${env:SnsArn, ""}',
          Endpoint: '${env:SqsArnA, ""}',
          Protocol: "sqs",
          RawMessageDelivery: "true",
          FilterPolicy: {
            notification: {
              attribute1: [ { "prefix": "TEST" } ],
              attributeParent: {
                attribute1: [ false ],
                attribute2: [ true ]
              }
            }
          },
          FilterPolicyScope: "MessageBody"
        }
      },
      WebhookSubscriptionB: {
        Type: "AWS::SNS::Subscription",
        Properties: {
          TopicArn: '${env:SnsArn, ""}',
          Endpoint: '${env:SqsArnB, ""}',
          Protocol: "sqs",
          RawMessageDelivery: "true",
          FilterPolicy: {
            notification: {
              attribute1: [ { "prefix": "DEMO" } ],
              attributeParent: {
                attribute1: [ true ],
                attribute2: [ true ]
              }
            }
          },
          FilterPolicyScope: "MessageBody"
        }
      },
      
      WebhookSubscriptionPolicies: {
        Type: 'AWS::SQS::QueuePolicy',
        Properties: {
          PolicyDocument: {
            Statement: [
              {
                Effect: 'Allow',
                Principal: '*',
                Action: 'sqs:SendMessage',
                Resource: '*',
                Condition: {
                  ArnEquals: {
                    'aws:SourceArn': '${env:SnsBookingEngineAdyenPaymentTransactionArn, "SnsBookingEngineAdyenPaymentTransactionArn"}'
                  }
                }
              }
            ]
          },
          Queues: [
            '${env:SqsUrlA, ""}',
            '${env:SqsUrlB, ""}'
          ]  
        }
      },
    }
  }
};

module.exports = serverlessConfiguration;