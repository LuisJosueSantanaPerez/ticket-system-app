import ApiService from "@/core/services/api.service";

// action types
export const GET_LIST_OF_CATEGORIES = "getListOfCategories";
// mutation types
export const SET_CATEGORIES = "setListOfCategories";

const state = {
  categories: [],
  pagination: {},
};

const getters = {};

const mutations = {
  [SET_CATEGORIES](state, payload) {
    state.categories = payload;
  },
};

const actions = {
  async [GET_LIST_OF_CATEGORIES]({ commit }, payload) {
    try {
      ApiService.setHeader();
      const { data } = await ApiService.query("categories", {
        params: payload,
      });
      commit(SET_CATEGORIES, data.data);
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
