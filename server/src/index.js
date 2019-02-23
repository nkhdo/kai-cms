require('dotenv-safe').config();
const fastify = require('fastify')({ logger: true });
const { MongoClient } = require('mongodb');
const fastifyMongodb = require('fastify-mongodb');
fastify.register(require('fastify-helmet'));
fastify.register(require('fastify-sensible'));
const apiRoutesGenerator = require('./services/api_routes_generator');

const start = async () => {
  try {
    const mongoClient = await MongoClient.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
    });
    const db = mongoClient.db(process.env.MONGO_DB);
    fastify.register(fastifyMongodb, {
      client: mongoClient,
    }).register((ftf, opts, next) => {
      ftf.decorate('db', db);
      next();
    });
    const apiRoutes = await apiRoutesGenerator(db);
    fastify.register(apiRoutes, {
      prefix: '/api',
    });

    await fastify.listen(process.env.PORT);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
