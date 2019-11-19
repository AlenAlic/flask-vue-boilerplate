// Main components
import Vue from "vue";
import App from "@/App";
import AppNotLoaded from "@/AppNotLoaded";

// Main extension
import router from "@/router";
import store from "@/store";
import i18n from "@/languages";

// Import the config independent modules.
import modal from "vue-js-modal";
import VueAxios from "vue-axios";
import Notify from "@/plugins/Alerts";

// Service Worker
import "./registerServiceWorker";

// API calls
import { frontendApi } from "@/api/frontend";
import { backendServer } from "@/api/backend";
import AuthHandler from "@/components/auth/AuthHandler";
import UtilitiesHandler from "@/assets/js/utilities";
import vuetify from "@/plugins/Vuetify";

// Register the config independent modules.
Vue.use(modal);
Vue.use(AuthHandler);
Vue.use(UtilitiesHandler);
Vue.use(Notify);

// Turn oof Vue Production tip
Vue.config.productionTip = false;

// Mount App function
async function main() {
  try {
    const config = await frontendApi.fetchConfig().catch(err => {
      throw err;
    });

    // Set config
    Vue.prototype.$config = config;
    Vue.prototype.$config.debug = config.debug || process.env.NODE_ENV === "development";

    // Set the baseURL according to the latest config and register the instance.
    backendServer.defaults.baseURL = Vue.prototype.$config.api.url;

    // Register the backend server as the Vue.axios instance.
    Vue.use(VueAxios, backendServer);

    new Vue({
      router,
      store,
      i18n,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  } catch (error) {
    new Vue({
      el: "#app",
      render: h => h(AppNotLoaded)
    }).$mount("#app");
  }
}

// Mount App
main();
