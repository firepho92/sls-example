import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'letter-request-layer-${env:STAGE, "stage"}',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
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
  layers: {
    CommonLetterRequest: {
      path: './'
    }
  },
  resources: {
    Outputs: {
      CommonLetterRequestLambdaLayerQualifiedArn: {
        Value: {
          "Ref": "CommonLetterRequestLambdaLayer"
        }
      }
    }
  }
}

module.exports = serverlessConfiguration; 