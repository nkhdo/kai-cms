import axios from 'axios';
console.log(process.env)

const http = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_SERVER_URL}/models`,
});

export const SET_MODELS = 'SET_MODELS';

const state = {
  models: [],
};

const mutations = {
  [SET_MODELS](state, models) {
    state.models = models;
  },
};

const actions = {
  async fetchModels({ commit }) {
    const models = await http.get('/');
    commit(SET_MODELS, models);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
