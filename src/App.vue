<template>
  <v-app>
    <Header v-if="$auth.isAuthenticated" @toggleDrawer="drawer = !drawer" />

    <v-navigation-drawer
      v-if="$auth.isAuthenticated"
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
  </v-app>
</template>

<script>
import NavigationDrawerContent from "@/components/general/NavigationDrawerContent";
import Header from "@/components/general/Header";
export default {
  name: "App",
  components: { NavigationDrawerContent, Header },
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
