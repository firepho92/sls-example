import type { AWS } from '@serverless/typescript';

import functions from './src/functions';

const serverlessConfiguration: AWS = {
  service: '${self:custom.func_prefix}',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
    'serverless-dotenv-plugin',
    'serverless-plugin-log-retention'
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'us-east-1',
    stage: '${env:Stage, "dev"}',
    apiGateway: {
      restApiId: '${env:ApiGatewayId,"restApiId"}',
      restApiRootResourceId: '${env:ApiGatewayResourcesId,"restApiRootResourceId"}',
    },
    tracing: {
      lambda: true,
    },
    environment: {
      SecretDBName: '${env:SecretDBName,"SecretDBName"}',
      Stage: '${env:Stage,"local"}',
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',  
    },
    layers: [
      '${param:commonLib, "commonlib"}',
      "${param:commonDb, 'commonlb'}",
    ],
    deploymentBucket: {
      name: '${ssm:s3_bucket_deploy_sls, "s3bucketdeploysls"}',
    },
    iam: {
      role: '${env:IamRole, "IamRole"}',
    },
    vpc: {
      securityGroupIds: { 'Fn::Split': [',', '${ssm:securityGroupIds, "SECURITY_GROUP_IDS"}'] },
      subnetIds: { 'Fn::Split': [',', '${ssm:subnetIds, "SUBNETS_IDS"}'] },
    },
  },
  // import the function via paths
  functions,
  package: { 
    individually: true,
    patterns: ['!**/node_modules/**', '!node_modules/']
  },
  custom: {
    logRetentionInDays: 30,
    esbuild: {
      external:[
        "pg-native",
        "joi",
        "@middy",
        "pg",
        "typeorm",
        "inversify",
        "uuid",
        "typeorm-naming-strategies",
        "@serverless",
        "reflect-metadata",
        "aws-sdk"
      ],
      bundle: true,
      minify: false,
      sourcemap: process.env.IS_OFFLINE === 'true',
      exclude: ['*'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    service: 'property',
    stage: '${env:Stage, "local"}',
    func_prefix: '${self:custom.stage}-${self:custom.service}',
  },
};

module.exports = serverlessConfiguration;