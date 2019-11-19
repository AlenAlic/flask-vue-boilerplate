import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.use(Vuetify);

const opts = {
  theme: {
    primary: "#673ab7",
    secondary: "#2196f3",
    accent: "#cddc39",
    error: "#ff5252",
    warning: "#fb8c00",
    info: "#2196f3",
    success: "#4caf50"
  }
};

export default new Vuetify(opts);
