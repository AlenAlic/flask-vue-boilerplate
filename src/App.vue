<template>
  <div class="container--main">
    <Sidenav
      v-if="$auth.isAuthenticated"
      :drawer="showDrawer"
      @hideDrawer="drawer = false"
      @clickedLink="hideDrawer"
    ></Sidenav>
    <Header
      v-if="$auth.isAuthenticated"
      @toggleDrawer="drawer = !drawer"
      :showSidenavButton="!windowIsWide"
    ></Header>
    <div class="full-width-height" :class="{ 'main-content': $auth.isAuthenticated }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import "@mdi/font/css/materialdesignicons.css";
import Sidenav from "@/components/general/Sidenav";
import Header from "@/components/general/Header";

export default {
  name: "App",
  components: { Header, Sidenav },
  data: function() {
    return {
      drawer: false,
      windowWidth: window.innerWidth
    };
  },
  computed: {
    windowIsWide() {
      return this.windowWidth >= 1200;
    },
    showDrawer() {
      return this.windowIsWide || this.drawer;
    }
  },
  methods: {
    hideDrawer: function() {
      if (!this.windowIsWide) this.drawer = false;
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.windowWidth = window.innerWidth;
      });
    });
  }
};
</script>

<style src="./assets/css/styles.scss" lang="scss"></style>
