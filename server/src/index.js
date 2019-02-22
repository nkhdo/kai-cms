require('dotenv-safe').config();
const fastify = require('fastify')({ logger: true });
fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: process.env.MONGO_URL,
});

fastify.register(require('./routes/api'), { prefix: '/api' });

const start = async () => {
  try {
    await fastify.listen(process.env.PORT);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
