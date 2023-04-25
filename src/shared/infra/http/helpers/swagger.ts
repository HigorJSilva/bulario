import swaggerAutogen from 'swagger-autogen'
const outputFile = './swagger_output.json'
const endpointsFiles = ['src/modules/**/infra/http/routes/index.ts']

const doc = {
  info: {
    version: '1.0.0',
    title: 'BULARIO API',
    description: 'Routes available for the use of the api'
  },
  host: 'bulario.higorsilva.dev',

  basePath: '/',
  schemes: ['https'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: ">- Enter the token with the `Bearer: ` prefix, e.g. 'Bearer abcde12345'"
    }
  },
  consumes: [
    'application/json'
  ],
  produces: [
    'application/json'
  ]
}

swaggerAutogen(outputFile, endpointsFiles, doc)
