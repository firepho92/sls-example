import type { AWS } from '@serverless/typescript';
const stage = process.env.Stage;
const serverlessConfiguration: AWS = {
  service: 'architecture-example-layer-lib-${env:Stage, "local"}',
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
    [`${stage}ArchitectureLib`]: {
      path: './'
    }
  },
  resources: {
    Outputs: {
      [`${stage}ArchitectureLibLambdaLayerQualifiedArn`]: {
        Value: {
          "Ref": `${stage}ArchitectureLibLambdaLayer`
        }
      }
    }
  },
  custom: {
    logRetentionInDays: 30,
    esbuild: {
      external:['aws-sdk'],
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