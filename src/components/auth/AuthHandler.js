import store from "@/store";
import { LOGIN, LOGOUT, RENEW, ACTIVATE, RESET_PASSWORD } from "@/store/modules/auth";

const AuthHandler = {
  install(Vue) {
    Vue.prototype.$auth = {
      /**
       * Get the currently signed in user.
       */
      get currentUser() {
        return store.getters.currentUser;
      },

      /**
       * Checks if the current user is authenticated
       */
      get isAuthenticated() {
        return !!this.currentUser;
      },

      /**
       * Sign in a user with a username and password.
       * @param email
       * @param password
       * @param remember_me
       * @returns {Promise}
       */
      signInWithUsernameAndPassword(email, password, remember_me) {
        return store.dispatch(LOGIN, { email, password, remember_me });
      },

      /**
       * Renew a user's session
       * @returns {Promise}
       */
      renew() {
        return store.dispatch(RENEW);
      },

      /**
       * Sign out the currently signed in user.
       * @returns {Promise}
       */
      signOut() {
        return store.dispatch(LOGOUT);
      },

      /**
       * Activate an account using the activation token
       * @param {string} token
       * @param password
       * @param repeat_password
       * @returns {Promise}
       */
      activate(token, password, repeat_password) {
        return store.dispatch(ACTIVATE, { token, password, repeat_password });
      },

      /**
       * Activate an account using the activation token
       * @param {string} token
       * @param password
       * @param repeat_password
       * @returns {Promise}
       */
      resetPassword(token, password, repeat_password) {
        return store.dispatch(RESET_PASSWORD, { token, password, repeat_password });
      }
    };
  }
};

export default AuthHandler;
