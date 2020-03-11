// #!/usr/bin/env node

const http = require('http');
const { createTerminus } = require('@godaddy/terminus');
const { logger, config } = require('./utils/');
const app = require('./app');
const { pool } = require('./models/');

const httpServer = http.createServer(app);

// see https://github.com/godaddy/terminus/blob/master/example/postgres/index.js
// for an example with terminus and pg
function onSignal() {
  logger.debug(
    `${config.name}@${config.version}[${config.env}] starting cleanup`
  );
  return Promise.all([pool.end()]);
}

async function onHealthCheck() {
  const pgInfo = {
    total: pool.totalCount,
    idle: pool.idleCount,
    waiting: pool.waitingCount,
  };
  logger.debug(
    `${config.name}@${config.version}[${
      config.env
    }] healthcheck (${JSON.stringify(pgInfo)})`
  );

  return Promise.all([
    pool.query('SELECT 1 AS ok;').then((res) => res.rowCount),
    Promise.resolve(pgInfo),
    // Promise.reject(new Error('test'))
  ]);
}

function onShutdown() {
  logger.debug(
    `${config.name}@${config.version}[${config.env}]  is shutting down`
  );
}

const terminusOpts = {
  // health check options: a function returning a promise indicating service health,
  healthChecks: { '/healthcheck': onHealthCheck, verbatim: false },
  timeout: 1000, // [optional = 1000] number of milliseconds before forceful exiting
  signals: ['SIGTERM', 'SIGINT', 'SIGUSR2'],
  onSignal, // [optional] cleanup function, returning a promise (used to be onSigterm)
  onShutdown, // [optional] called right before exiting
  logger: logger.error,
};

createTerminus(httpServer, terminusOpts);

httpServer.listen(config.httpPort, () => {
  logger.debug(
    `${config.name}@${config.version}[${config.env}] listening on ${config.httpPort}`
  );
});