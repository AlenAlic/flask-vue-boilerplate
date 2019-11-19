<template>
  <div class="wrapper" id="app">
    <Header></Header>
    <main class="main">
      <div class="container no-padding full-height">
        <router-view></router-view>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script>
import "@mdi/font/css/materialdesignicons.css";
import Header from "@/components/general/Header";
import Footer from "@/components/general/Footer";

export default {
  name: "App",
  components: { Header, Footer }
};
</script>

<style src="./assets/css/styles.scss" lang="scss"></style>
