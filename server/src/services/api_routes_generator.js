const generateModelRoutes = ({ name, slug, schema }) => async (fastify, opts, next) => {
  fastify.log.info(`Registering routes for ${name}`);
  const collection = fastify.db.collection(slug);
  fastify.get('/', async () => {
    const recordsCursor = await collection.find();
    return recordsCursor.toArray();
  });
  fastify.get('/:id', async (req) => {
    const oId = fastify.kai.buildObjectId(req.params.id);
    const record = await collection.findOne({
      _id: oId,
    });
    if (!record) {
      throw fastify.httpErrors.notFound();
    }
    return record;
  });
  fastify.post('/', async (req) => {
    const recordParams = fastify.kai.buildRecordParams(req.body, schema);
    const result = await collection.insertOne(recordParams);
    return result.ops[0];
  });
  fastify.post('/:id', async (req) => {
    const oId = fastify.kai.buildObjectId(req.params.id);
    const recordParams = fastify.kai.buildRecordParams(req.body, schema);
    const { value } = await collection.findOneAndUpdate({
      _id: oId,
    }, {
      $set: recordParams,
    }, {
      returnOriginal: false,
    });
    if (!value) {
      throw fastify.httpErrors.notFound();
    }
    return value;
  });
  fastify.delete('/:id', async (req) => {
    const oId = fastify.kai.buildObjectId(req.params.id);
    const { value } = await collection.findOneAndDelete({
      _id: oId,
    });
    if (!value) {
      throw fastify.httpErrors.notFound();
    }
    return value;
  });
  next();
};

module.exports = async (db) => {
  const modelsCollection = db.collection('models');
  const models = await modelsCollection.find().toArray();
  return (fastify, opts, next) => {
    models.forEach((model) => {
      fastify.register(generateModelRoutes(model), {
        prefix: `/${model.slug}`,
      });
    });
    next();
  };
};
