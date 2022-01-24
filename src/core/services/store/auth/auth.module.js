import ApiService from "@/core/services/api.service";
import JwtService from "@/core/services/jwt.service";
import { reject } from "eslint-plugin-promise/rules/lib/promise-statics";

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUser";
export const SET_ERROR = "setError";

const state = {
  errors: null,
  user: {},
  isAuthenticated: !!JwtService.getToken(),
};

const getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  },
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post("auth/login", credentials)
        .then(({ data }) => {
          context.commit(SET_AUTH, data.data);
          resolve(data);
        })
        .catch(({ message }) => {
          reject(message);
          context.commit(SET_ERROR, message);
        });
    });
  },
  [LOGOUT](context) {
    if (JwtService.getToken()) {
      return new Promise((resolve, reject) => {
        ApiService.get("auth/logout")
          .then(({ data }) => {
            context.commit(PURGE_AUTH);
            resolve(data);
          })
          .catch(({ message }) => {
            reject(message);
            context.commit(SET_ERROR, message);
          });
      });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
  [VERIFY_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader();
      ApiService.get("auth", "verify")
        .then(({ data }) => {
          context.commit(SET_AUTH, data.data);
        })
        .catch(({ response }) => {
          JwtService.destroyToken();
          context.commit(PURGE_AUTH);
          context.commit(SET_ERROR, response.message);
        });
    } else {
      context.commit(PURGE_AUTH);
    }
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = user;
    state.errors = {};
    JwtService.saveToken(state.user.token);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    state.errors = {};
    JwtService.destroyToken();
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
