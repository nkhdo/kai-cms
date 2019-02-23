const fastifyPlugin = require('fastify-plugin');

const mongoPlugin = (fastify, opts, next) => {
  const { db } = opts;
  fastify.decorate('db', db);
  next();
};

module.exports = fastifyPlugin(mongoPlugin);
