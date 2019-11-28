<template>
  <nav class="sidebar sidebar-expand-lg overflow-auto" :class="{ show: drawer }">
    <div class="sidebar-brand">
      <router-link class="sidebar-link" :to="{ name: 'home' }">
        Title
      </router-link>
      <button
        class="sidebar-close btn btn-outline-primary"
        type="button"
        @click="$emit('toggleDrawer')"
      >
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div class="" id="sidebar">
      <ul class="sidebar-nav"></ul>
      <h6 class="sidebar-heading">Statistics</h6>
      <ul class="sidebar-nav">
        <li class="sidebar-item">
          <a class="sidebar-link" href="#">
            <i class="fas fa-tools"></i>
            Work in progress
          </a>
        </li>
      </ul>
      <div class="my-5"></div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  props: { drawer: Boolean },
  methods: {
    signOut: function() {
      this.$auth.signOut().then(() => {
        this.$router.replace({
          name: "home"
        });
      });
    }
  }
};
</script>
