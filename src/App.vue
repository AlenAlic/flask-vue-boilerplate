<template>
  <v-app>
    <Header></Header>

    <v-content>
      <router-view></router-view>
    </v-content>

    <Footer></Footer>
  </v-app>
</template>

<script>
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";

export default {
  name: "App",
  components: { Header, Footer }
};
</script>

<style src="./assets/css/styles.scss" lang="scss"></style>
