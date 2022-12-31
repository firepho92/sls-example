const serverlessCompose = {
  services: {
    'architecture-example-lib': {
      path: 'layers/lib'
    },
    'architecture-example-layer-db': {
      path: 'layers/db'
    },
    'apiGateway': {
      path: 'services/apiGateway',
      dependsOn: ['architecture-example-lib', 'architecture-example-layer-db'],
      params: {
        'commonLib': '${architecture-example-lib.CommonArchitectureExampleLibLambdaLayerQualifiedArn}',
        'commonDb': '${architecture-example-db.CommonArchitectureExampleDbLambdaLayerQualifiedArn}',
      }
    },
  }
}

module.exports = serverlessCompose;