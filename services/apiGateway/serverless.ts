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
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      FailedEmailsTable: '${env:FailedEmailsTable, "FailedEmailsTable"}',
      SqsFailedEmailsSQSDeadLetterArn: '${env:SqsFailedEmailsSQSDeadLetterArn, "SqsFailedEmailsSQSDeadLetterArn"}',
      SqsFailedEmailsSQSDeadLetterUrl: '${env:SqsFailedEmailsSQSDeadLetterUrl, "SqsFailedEmailsSQSDeadLetterUrl"}',
      SqsFailedEmailsSQSArn: '${env:SqsFailedEmailsSQSArn, "SqsFailedEmailsSQSArn"}',
      SqsFailedEmailsSQSUrl: '${env:SqsFailedEmailsSQSUrl, "SqsFailedEmailsSQSUrl"}',
      CLEVER_FRM_SERVICES: '${env:CLEVER_FRM_SERVICES, "CLEVER_FRM_SERVICES"}',
      CLEVER_AUTH_SERVICES: '${env:CLEVER_AUTH_SERVICES, "CLEVER_AUTH_SERVICES"}',
      CLEVER_USER: '${ssm:CLEVER_USER, "CLEVER_USER"}',
      CLEVER_USER_PWD: '${ssm:CLEVER_USER_PWD, "CLEVER_USER_PWD"}',      
    },
    layers: ["${param:commonLibs, 'commonLibs'}"],
    deploymentBucket: {
      name: '${ssm:s3_bucket_deploy_sls, "s3_bucket_deploy_sls"}',
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
      external:['mjml'],
      bundle: true,
      minify: false,
      sourcemap: process.env.ENVIRONMENT === 'local',
      exclude: ['*'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    service: 'api-gateway',
    stage: '${env:Stage, "Stage"}',
    func_prefix: '${self:custom.stage}-${self:custom.service}',
  },
};

module.exports = serverlessConfiguration;