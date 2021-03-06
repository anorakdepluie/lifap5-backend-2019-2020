/**
 * @file router for the '/api-docs' route, bound to swagger-ui-express
 * @author Romuald THION
 */

const { Router } = require('express');
const swaggerUI = require('swagger-ui-express');

// options to swagger-ui-express
// https://github.com/scottie1984/swagger-ui-express
// https://github.com/swagger-api/swagger-ui/blob/master/docs/usage/configuration.md
const swaggerUIOptions = {
  explorer: false,
  swaggerUrl: '/open-api-specification.yaml',
  swaggerOptions: {
    defaultModelsExpandDepth: 0,
    defaultModelExpandDepth: 0,
    defaultModelRendering: "example",
    displayRequestDuration: true,
    docExpansion: 'none', // none 'list'
    filter: true,
    operationsSorter: 'method'
    // validatorUrl: null  to disable
  },
};

module.exports = function apiDocsRouter(_app) {
  // the router
  const router = Router();
  router.use('/', [swaggerUI.serve, swaggerUI.setup(null, swaggerUIOptions)]);

  return router;
};
