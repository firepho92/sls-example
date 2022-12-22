const serverlessCompose = {
  services: {
    'architecture-example': {
      path: 'layers/lib'
    },
    'apiGateway': {
      path: 'services/apiGateway',
      dependsOn: ['architecture-example'],
      params: {
        'commonLibs': '${architecture-example.CommonArchitectureExampleLambdaLayerQualifiedArn}',
      }
    },
  }
}

module.exports = serverlessCompose;