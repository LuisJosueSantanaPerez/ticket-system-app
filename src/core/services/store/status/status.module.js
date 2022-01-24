import ApiService from "@/core/services/api.service";

// action types
export const GET_LIST_OF_STATUSES = "getListOfStatuses";
// mutation types
export const SET_STATUSES = "setStatuses";

const state = {
  statues: [],
  pagination: {},
};

const getters = {};

const mutations = {
  [SET_STATUSES](state, payload) {
    state.statues = payload;
  },
};

const actions = {
  async [GET_LIST_OF_STATUSES]({ commit }, payload) {
    try {
      ApiService.setHeader();
      const { data } = await ApiService.query("statuses", {
        params: payload,
      });
      commit(SET_STATUSES, data.data);
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
