const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "What did you eat API",
      version: "1.0.0",
      description: "What did you eat API with express",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    host: "localhost:3001",
    basePath: "/",
  },
  apis: ["./routes/*.js", "./swagger/*"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
