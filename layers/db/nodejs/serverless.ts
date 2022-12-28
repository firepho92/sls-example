import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 'architecture-example-layer-db-${env:Stage, "local"}',
  frameworkVersion: '3',
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    deploymentBucket: {
      name: '${ssm:s3_bucket_deploy_sls, "s3_bucket_deploy_sls"}',
    },
  },
  layers: {
    CommonArchitectureExampleDb: {
      path: './'
    }
  },
  resources: {
    Outputs: {
      CommonArchitectureExampleDbLambdaLayerQualifiedArn: {
        Value: {
          "Ref": "CommonArchitectureExampleDbLambdaLayer"
        }
      }
    }
  },
  custom: {
    logRetentionInDays: 30,
    esbuild: {
      external:['joi', 'middy', 'pg', 'typeorm', 'inversify', 'uuid'],
      bundle: true,
      minify: false,
      sourcemap: process.env.IS_OFFLINE === 'true',
      exclude: ['*'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    service: 'api-gateway',
    stage: '${env:Stage, "local"}',
    func_prefix: '${self:custom.stage}-${self:custom.service}',
  }
}

module.exports = serverlessConfiguration; 