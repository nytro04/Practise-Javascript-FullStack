const state = () => ({
  providers: [],
});

const mutations = {
  SET_PROVIDERS(state, providers) {
    state.providers = providers;
  },

  SET_PROVIDER(state, provider) {
    state.providers = [...state.providers, provider];
  },

  DELETE_PROVIDER(state, id) {
    state.providers = state.providers.filter((provider) => provider._id !== id);
  },
};

const actions = {
  setProviders({ commit }, providers) {
    commit("SET_PROVIDERS", providers);
  },

  setProvider({ commit }, provider) {
    commit("SET_PROVIDER", provider);
  },

  deleteProvider({ commit }, id) {
    commit("DELETE_PROVIDER", id);
  },
};

const getters = {
  // fetchProviders(state) {
  //   return state.providers;
  // },

  fetchProviders: (state) => state.providers,
};

const namespaced = true;

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced,
};
