const serverlessCompose = {
  services: {
    'letter-request-layer': {
      path: 'layers/lib'
    },
    'letter': {
      path: 'service/letterService',
      dependsOn: ['letter-request-layer'],
      params: {
        'commonLibs': '${letter-request-layer.CommonLetterRequestLambdaLayerQualifiedArn}',
      }
    },
  }
}

module.exports = serverlessCompose;