const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require('dotenv').config();

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "QR Code Management API",
      version: "1.0.0",
      description: "API documentation for the QR Code Management Platform",
    },
    servers: [
      {
        url: `${process.env.DOMAIN_NAME}`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

const setupSwaggerDocs = (app) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`Swagger docs available at ${process.env.DOMAIN_NAME}/docs`);
};

module.exports = setupSwaggerDocs;
