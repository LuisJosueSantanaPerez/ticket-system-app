import ApiService from "@/core/services/api.service";

// action types
export const GENERATE_REPORT = "generateReport";

// mutation types
export const SET_REPORTS = "setReports";

const state = {
  reports: [],
};

const getters = {};

const mutations = {
  [SET_REPORTS](state, payload) {
    state.reports = payload;
  },
};

const actions = {
  async [GENERATE_REPORT]({ commit }, payload) {
    try {
      const { dateFrom, dateTo } = payload;
      const query = { date_from: dateFrom, date_to: dateTo };
      ApiService.setHeader();
      const { data } = await ApiService.query("reports", {
        params: query,
      });
      commit(SET_REPORTS, data.data);
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
