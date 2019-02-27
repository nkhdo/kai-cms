require('dotenv-safe').config();
const fastify = require('fastify')({ logger: true });
const { MongoClient } = require('mongodb');
fastify.register(require('fastify-helmet'));
fastify.register(require('fastify-sensible'));
fastify.register(require('fastify-cors'), { origin: '*' });
const mongoPlugin = require('./plugins/mongo');
const kaiPlugin = require('./plugins/kai');
const apiRoutesGenerator = require('./services/api_routes_generator');
const modelsRoutes = require('./routes/models');

const start = async () => {
  try {
    const mongoClient = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    const db = mongoClient.db(process.env.MONGO_DB);
    fastify.register(mongoPlugin, {
      db,
    });
    fastify.register(kaiPlugin);
    fastify.register(modelsRoutes, {
      prefix: '/models',
    });
    const apiRoutes = await apiRoutesGenerator(db);
    fastify.register(apiRoutes, {
      prefix: '/api',
    });
    await fastify.ready();
    await fastify.listen(process.env.PORT);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
