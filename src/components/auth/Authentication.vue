<template>
  <div class="container--center bg-dark">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Authentication",
  created() {
    if (this.$auth.currentUser !== null) {
      let redirect = this.$route.query.redirect;
      if (redirect) {
        this.$router.replace(redirect);
      } else {
        this.$router.replace({
          name: "dashboard"
        });
      }
    }
  }
};
</script>
