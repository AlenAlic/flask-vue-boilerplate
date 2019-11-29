import { AuthenticatedUser, authApi } from "@/api/auth";
import { loadServerToken, saveServerToken } from "@/api/util/token-storage";
import { backendServer } from "@/api/util/servers";

const SET_USER = "AUTH: Set user";

const LOGIN = "LOGIN";
const LOGIN_REQUEST = "LOGIN: Login request sent.";
const LOGIN_SUCCESS = "LOGIN: Successful request.";
const LOGIN_ERROR = "LOGIN: Failed request.";

const LOGOUT = "LOGOUT";
const LOGOUT_REQUEST = "LOGOUT: Logout request sent.";
const LOGOUT_SUCCESS = "LOGOUT: Successful request.";
const LOGOUT_ERROR = "LOGOUT: Failed request.";

const RENEW = "RENEW";
const RENEW_REQUEST = "RENEW: Renew token request sent.";
const RENEW_SUCCESS = "RENEW: Successful request.";
const RENEW_ERROR = "RENEW: Failed request.";

const ACTIVATE = "ACTIVATE";
const ACTIVATE_REQUEST = "ACTIVATE: Account activation request sent.";
const ACTIVATE_SUCCESS = "ACTIVATE: Successful request.";
const ACTIVATE_ERROR = "ACTIVATE: Failed request.";

const RESET_PASSWORD = "RESET_PASSWORD";
const RESET_PASSWORD_REQUEST = "RESET_PASSWORD: Reset password request sent.";
const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD: Successful request.";
const RESET_PASSWORD_ERROR = "RESET_PASSWORD: Failed request.";

export { LOGIN, LOGOUT, RENEW, ACTIVATE, RESET_PASSWORD };

const getUser = () => {
  const token = loadServerToken(backendServer);
  const user = token ? new AuthenticatedUser(token) : null;
  return !!user && user.isValid ? user : null;
};

export default {
  state: {
    user: getUser(),
    loading: false
  },
  mutations: {
    [SET_USER](state, token) {
      saveServerToken(backendServer, token);
      state.user = new AuthenticatedUser(token);
    },

    [LOGIN_REQUEST](state) {
      state.loading = true;
    },
    [LOGIN_SUCCESS](state) {
      state.loading = false;
    },
    [LOGIN_ERROR](state) {
      state.loading = false;
    },

    [LOGOUT_REQUEST](state) {
      state.loading = true;
    },
    [LOGOUT_SUCCESS](state) {
      state.user = null;
      state.loading = false;
    },
    [LOGOUT_ERROR](state) {
      state.loading = false;
    },

    [RENEW_REQUEST](state) {
      state.loading = true;
    },
    [RENEW_SUCCESS](state) {
      state.loading = false;
    },
    [RENEW_ERROR](state) {
      state.loading = false;
    },

    [ACTIVATE_REQUEST](state) {
      state.loading = true;
    },
    [ACTIVATE_SUCCESS](state) {
      state.loading = false;
    },
    [ACTIVATE_ERROR](state) {
      state.loading = false;
    },

    [RESET_PASSWORD_REQUEST](state) {
      state.loading = true;
    },
    [RESET_PASSWORD_SUCCESS](state) {
      state.loading = false;
    },
    [RESET_PASSWORD_ERROR](state) {
      state.loading = false;
    }
  },
  actions: {
    // Sign a user in
    [LOGIN]({ commit }, { email, password, remember_me }) {
      commit(LOGIN_REQUEST);
      return authApi
        .login(email, password, remember_me)
        .then(response => {
          commit(SET_USER, response.data);
          commit(LOGIN_SUCCESS);
        })
        .catch(error => {
          commit(LOGIN_ERROR);
          throw error;
        });
    },
    // Sign a user out
    [LOGOUT]: ({ commit }) => {
      commit(LOGOUT_REQUEST);
      return authApi
        .logout()
        .then(() => {
          saveServerToken(backendServer, null);
          commit(LOGOUT_SUCCESS);
        })
        .catch(error => {
          commit(LOGOUT_ERROR);
          throw error;
        });
    },
    // Renew user token
    [RENEW]({ commit }) {
      commit(RENEW_REQUEST);
      return authApi
        .renew()
        .then(response => {
          commit(SET_USER, response.data);
          commit(RENEW_SUCCESS);
        })
        .catch(() => {
          commit(RENEW_ERROR);
        });
    },
    // Activate user account
    [ACTIVATE]: ({ commit }, { token, password, repeat_password }) => {
      commit(ACTIVATE_REQUEST);
      return authApi
        .activate(token, password, repeat_password)
        .then(() => {
          commit(ACTIVATE_SUCCESS);
        })
        .catch(error => {
          commit(ACTIVATE_ERROR);
          throw error;
        });
    },
    // Reset user password
    [RESET_PASSWORD]: ({ commit }, { token, password, repeat_password }) => {
      commit(RESET_PASSWORD_REQUEST);
      return authApi
        .resetPassword(token, password, repeat_password)
        .then(() => {
          commit(RESET_PASSWORD_SUCCESS);
        })
        .catch(error => {
          commit(RESET_PASSWORD_ERROR);
          throw error;
        });
    }
  },
  getters: {
    currentUser: state => {
      return state.user;
    },
    fullName: state => {
      return state.user ? state.user.fullName : null;
    }
  }
};
