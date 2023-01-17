import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'pr-architecture-guide-lines-${env:Stage, "stage"}',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    deploymentBucket: {
      name: '${ssm:s3_bucket_deploy_sls, "s3_bucket_deploy_sls"}',
    },
  },
  resources: {
    Resources: {
      DefaultAuthorizer: {
        Type: "AWS::ApiGateway::Authorizer",
        Properties: {
          AuthorizerUri: '${ssm:AuthorizerUri, "AuthorizerUri"}',
          Type: "REQUEST",
          IdentitySource: 'method.request.header.Authorization',
          RestApiId:  '${env:ApiGatewayId,"restApiId"}',
          Name: 'GSAuthorizer-booking-${env:STAGE, "stage"}',
          AuthorizerResultTtlInSeconds: 0
        }
      },
      DefaultAuthorizerPermission: {
        Type: 'AWS::Lambda::Permission',
        Properties: {
            Action: 'lambda:InvokeFunction',
            FunctionName: '${ssm:AuthorizerFunctionName, "AuthorizerFunctionName"}',
            Principal: 'apigateway.amazonaws.com'
        }
      }
    },
    Outputs: {
      DefaultAuthorizer: {
        Value: {
          "Ref": "DefaultAuthorizer"
        }
      }
    }
  }
}

module.exports = serverlessConfiguration; 