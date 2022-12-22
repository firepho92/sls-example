const serverlessCompose = {
  services: {
    'architecture-example': {
      path: 'layers/lib'
    },
    'apiGateway': {
      path: 'service/apiGateway',
      dependsOn: ['architecture-example'],
      params: {
        'commonLibs': '${architecture-example.CommonArchitectureExampleLambdaLayerQualifiedArn}',
      }
    },
  }
}

module.exports = serverlessCompose;