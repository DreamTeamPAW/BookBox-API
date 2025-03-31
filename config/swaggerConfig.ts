import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BookBox API',
      version: '1.0.0',
      description: 'API for BookBox application',
    },
    components: {
      schemas: {
        Book: {
          type: 'object',
          properties: {
            userId: {
              type: 'string',
              description: 'The user ID associated with the book',
            },
            isbn: {
              type: 'string',
              description: 'The ISBN of the book',
            },
            title: {
              type: 'string',
              description: 'The title of the book',
            },
            author: {
              type: 'string',
              description: 'The author of the book',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'List of tags for the book',
            },
            status: {
              type: 'string',
              enum: ['unread', 'reading', 'finished'],
              description: 'The current reading status of the book',
            },
            dateAdded: {
              type: 'string',
              format: 'date-time',
              description: 'The date when the book was added to the system',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              description: 'The username of the user',
            },
            passwordHash: {
              type: 'string',
              description: 'The hashed password of the user',
            },
            email: {
              type: 'string',
              description: 'The email address of the user',
            },
            validTokens: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'List of valid tokens for the user',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*'],
};

export default swaggerJSDoc(swaggerOptions);
