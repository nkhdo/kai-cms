const fastifyPlugin = require('fastify-plugin');
const _ = require('lodash');
const { ObjectId } = require('mongodb');

const buildObjectId = (id, fastify) => {
  try {
    return new ObjectId(id);
  } catch (err) {
    throw fastify.httpErrors.badRequest('Invalid "_id" format');
  }
};

const buildRecordParams = (params, schema, fastify) => {
  const built = {};
  _.forEach(schema, ({ type, required }, key) => {
    const value = params[key];
    if (required && _.isNil(value)) {
      throw fastify.httpErrors.badRequest(`Missing required field: ${key}`);
    }
    // eslint-disable-next-line
    if (type && (typeof value) !== type) {
      throw fastify.httpErrors.badRequest(`Invalid field type: ${key}. Expected ${type}`);
    }
    built[key] = value;
  });
  return built;
};

const kaiPlugin = (fastify, opts, next) => {
  fastify.decorate('kai', {
    buildObjectId: id => buildObjectId(id, fastify),
    buildRecordParams: (params, schema) => buildRecordParams(params, schema, fastify),
  });
  next();
};

module.exports = fastifyPlugin(kaiPlugin);
