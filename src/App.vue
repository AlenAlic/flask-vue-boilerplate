<template>
  <v-app>
    <Header @toggleDrawer="drawer = !drawer" />

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      :permanent="$vuetify.breakpoint.lgAndUp"
      app
    >
      <NavigationDrawerContent />
    </v-navigation-drawer>

    <v-content>
      <v-container class="fill-height" fluid>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </v-container>
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import NavigationDrawerContent from "@/components/general/NavigationDrawerContent";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";
export default {
  name: "App",
  components: { NavigationDrawerContent, Header, Footer },
  data: () => ({
    drawer: null
  }),
  created: function() {
    this.$nextTick(function() {
      this.$auth.renew();
    });
  }
};
</script>

<style src="./assets/css/styles.scss" lang="scss"></style>
