import axios from 'axios';
import _ from 'lodash';

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_SERVER_URL,
});

export const SET_MODELS = 'SET_MODELS';

const state = {
  models: [],
};

const getters = {
  getModelBySlug: state => slug => _.find(state.models, { slug }),
};

const mutations = {
  [SET_MODELS](state, models) {
    state.models = models;
  },
};

const actions = {
  async fetchModels({ commit }) {
    const { data: models } = await http.get('/models');
    commit(SET_MODELS, models);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
