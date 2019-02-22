module.exports = (fastify, opts, next) => {
  fastify.get('/', async () => ({ message: 'Hello world' }));
  next();
};
