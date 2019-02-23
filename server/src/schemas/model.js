module.exports = {
  name: {
    type: 'string',
    required: true,
  },
  slug: {
    type: 'string',
    required: true,
    unique: true,
  },
  schema: {
    type: 'object',
    required: true,
  },
};
