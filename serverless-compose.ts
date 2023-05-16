const serverlessCompose = {
  services: {
    'architecture-example-layer-lib': {
      path: 'layers/lib'
    },
    'architecture-example-layer-db': {
      path: 'layers/db'
    },
    'default-authorizer': {
      dependsOn: ['architecture-example-layer-lib', 'architecture-example-layer-db'],
      path: 'authorizer/lambda-authorizer',
    },
    'apiGateway': {
      path: 'services/apiGateway',
      dependsOn: ['architecture-example-layer-lib', 'architecture-example-layer-db'],
      params: {
        'commonLib': '${architecture-example-layer-lib.CommonArchitectureExampleLibLambdaLayerQualifiedArn, "CommonArchitectureExampleLib"}',
        'commonDb': '${architecture-example-layer-db.CommonArchitectureExampleDbLambdaLayerQualifiedArn, "CommonArchitectureExampleDb"}',
        'authorizer': '${default-authorizer.DefaultAuthorizer}'
      }
    },
  }
}

module.exports = serverlessCompose;