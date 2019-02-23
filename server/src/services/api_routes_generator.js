module.exports = async (db) => {
  const modelsCollection = await db.collection('models');
  const models = await modelsCollection.find().toArray();
  return (fastify, opts, next) => {
    models.forEach((model) => {
      console.log(model);
      fastify.get(`/${model.slug}`, async () => ({ message: `${model.name}` }));
    });
    fastify.get('/', async () => ({ message: 'Hello world' }));
    next();
  };
};
