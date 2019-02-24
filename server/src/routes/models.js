const schema = require('../schemas/_model');

module.exports = (fastify, opts, next) => {
  const collection = fastify.db.collection('_models');
  fastify.get('/', async () => {
    const models = await collection.find();
    return models.toArray();
  });

  fastify.post('/', async (req) => {
    const modelParams = fastify.kai.buildRecordParams(req.body, schema);
    const result = await collection.insertOne(modelParams);
    return result.ops[0];
  });

  fastify.get('/:slug', async (req) => {
    const { slug } = req.params;
    const model = await collection.findOne({
      slug,
    });
    if (!model) {
      throw fastify.httpErrors.notFound();
    }
    return model;
  });

  fastify.post('/:slug', async (req) => {
    const { slug } = req.params;
    const modelParams = fastify.kai.buildRecordParams(req.body, schema);
    const { value } = await collection.findOneAndUpdate({
      slug,
    }, {
      $set: modelParams,
    }, {
      returnOriginal: false,
    });
    if (!value) {
      throw fastify.httpErrors.notFound();
    }
    return value;
  });

  fastify.delete('/:slug', async (req) => {
    const { slug } = req.params;
    const { value } = await collection.findOneAndDelete({
      slug,
    });
    if (!value) {
      throw fastify.httpErrors.notFound();
    }
    return value;
  });
  next();
};
