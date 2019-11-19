<template>
  <div class="cookie_bar" v-if="show">
    <cookie-modal v-if="type === 'modal'" @confirm="confirm"></cookie-modal>
    <cookie-banner v-else @confirm="confirm"></cookie-banner>
  </div>
</template>

<script>
import CookieModal from "./CookieModal.vue";
import CookieBanner from "./CookieBanner.vue";

export default {
  name: "cookie-notification",
  components: { CookieModal, CookieBanner },
  data: function() {
    return {
      name: "cookie-notification",

      show: false,
      type: "banner"
    };
  },
  created() {
    var local = this.getLocalStorage();
    if (this.$config.cookies.enabled && !local) {
      this.show = true;
      this.type = this.$config.cookies.type;
    }
  },
  mounted() {
    if (this.type === "modal") {
      this.$modal.show("cookie-modal");
    }
  },
  methods: {
    getLocalStorage() {
      let item = localStorage.getItem("cookies");
      if (!item) {
        return false;
      } else {
        return JSON.parse(item);
      }
    },
    confirm() {
      localStorage.setItem("cookies", true);
      this.show = false;
    }
  }
};
</script>
