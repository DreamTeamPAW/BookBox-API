import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'BookBox API',
    description: 'API for BookBox application',
    version: '1.0.0',
  },
  servers: [
    {
        url: 'http://localhost:3000',
        description: ''
    },
    ],
};


const outputFile = './swagger_output.json';
const endpointsFiles = ['./index.ts'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);
