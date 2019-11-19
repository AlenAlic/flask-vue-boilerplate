import store from "@/store";
import { LOGIN, LOGOUT, ACTIVATE } from "@/store/modules/auth";
import { saveServerToken } from "@/api/util/token-storage";
import { backendServer } from "@/api/util/servers";

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
        return store
          .dispatch(LOGIN, { email, password, remember_me })
          .then(result => {
            saveServerToken(backendServer, result.data);
          })
          .catch(({ status }) => {
            throw { status };
          });
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

      // /**
      //  * Renew a user's session
      //  * @returns {Promise<AuthenticatedUser>}
      //  */
      // renew() {
      //   return authApi.renew();
      // },

      /**
       * Sign out the currently signed in user.
       * @returns {Promise}
       */
      signOut() {
        saveServerToken(backendServer, null);
        store.dispatch(LOGOUT);
      }
    };
  }
};

export default AuthHandler;
