import axios from 'axios';
import _ from 'lodash';

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_SERVER_URL,
});

export const SET_MODELS = 'SET_MODELS';
export const SET_MODEL_RECORDS = 'SET_MODEL_RECORDS';

const state = {
  models: [],
  modelRecords: {},
};

const getters = {
  getModelBySlug: state => slug => _.find(state.models, { slug }),
  getModelRecords: state => slug => state.modelRecords[slug] || [],
};

const mutations = {
  [SET_MODELS](state, models) {
    state.models = models;
  },
  [SET_MODEL_RECORDS](state, { slug, records }) {
    state.modelRecords[slug] = records;
  },
};

const actions = {
  async fetchModels({ commit }) {
    const { data: models } = await http.get('/models');
    commit(SET_MODELS, models);
    return models;
  },
  async fetchRecords({ commit }, slug) {
    const { data: records } = await http.get(`/api/${slug}`);
    commit(SET_MODEL_RECORDS, { slug, records });
    return records;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
