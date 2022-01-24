import ApiService from "@/core/services/api.service";

// action types
export const GET_LIST_OF_PRIORITIES = "getListOfPriorities";
// mutation types
export const SET_PRIORITIES = "setListOfPriorities";

const state = {
  priorities: [],
  pagination: {},
};

const getters = {};

const mutations = {
  [SET_PRIORITIES](state, payload) {
    state.priorities = payload;
  },
};

const actions = {
  async [GET_LIST_OF_PRIORITIES]({ commit }, payload) {
    try {
      ApiService.setHeader();
      const { data } = await ApiService.query("priorities", {
        params: payload,
      });
      commit(SET_PRIORITIES, data.data);
    } catch (e) {
      throw e;
    }
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
