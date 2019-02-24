const fastifyPlugin = require('fastify-plugin');

const setupIndexes = (db) => {
  db.collection('models').createIndex({ slug: 1 }, { unique: true });
};

const mongoPlugin = (fastify, opts, next) => {
  const { db } = opts;
  setupIndexes(db);
  fastify.decorate('db', db);
  next();
};

module.exports = fastifyPlugin(mongoPlugin);
