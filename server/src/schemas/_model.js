module.exports = {
  name: {
    type: 'string',
    required: true,
  },
  slug: {
    type: 'string',
    required: true,
    blacklist: ['_models'],
  },
  description: {
    type: 'string',
    defaultValue: '',
  },
  schema: {
    type: 'object',
    required: true,
  },
  indexes: {
    type: 'object', // array
    defaultValue: [],
  },
};
