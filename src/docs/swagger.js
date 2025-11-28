import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Libros en Línea',
      version: '1.0.0',
      description:
        'The API documentation for the Book Management System is a comprehensive guide designed to ' +
        'help developers understand and integrate with the API. ' +
        'This system allows users to securely create, read, update, and delete books, ' +
        'manage users through JWT authentication, and maintain traceability of critical operations.\n\n' +
        'The API includes the following modules:\n' +
        '- Book Management: Create, list (with pagination, filters, and sorting), get details, update, and delete books.\n' +
        '- User Management: Registration and login with JWT.\n' +
        '- Security: Only authenticated users can create, edit, or delete books.\n' +
        '- Auditing: Logs of critical actions in the database.\n\n' +
        'Each endpoint includes parameters, request and response examples, and is documented with Swagger for easy exploration and testing.',
    },
    servers: [
      {
        url: `${process.env.HOST}:${process.env.PORT}/api/${process.env.API_VERSION}`,
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: [path.join(process.cwd(), './src/docs/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
