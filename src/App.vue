<template>
  <div class="container--main">
    <Sidenav
      v-if="$auth.isAuthenticated"
      :drawer="drawer"
      @toggleDrawer="drawer = !drawer"
    ></Sidenav>
    <Navbar v-if="$auth.isAuthenticated" @toggleDrawer="drawer = !drawer"></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import "@mdi/font/css/materialdesignicons.css";
import Sidenav from "@/components/general/Sidenav";
import Navbar from "@/components/general/Navbar";

export default {
  name: "App",
  components: { Navbar, Sidenav },
  data: function() {
    return {
      drawer: false
    };
  }
};
</script>

<style src="./assets/css/styles.scss" lang="scss"></style>
