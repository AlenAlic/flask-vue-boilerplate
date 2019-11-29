<template>
  <nav class="navbar bg-primary navbar-default navbar-dark">
    <button
      class="navbar-toggler sidebar-toggler"
      @click="$emit('toggleDrawer')"
      v-if="showSidenavButton"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="ml-auto">
      <div class="btn btn-outline-light" @click="openDropdown = !openDropdown">
        <i class="fas fa-user-circle mr-2"></i>
        {{ $auth.fullName || "User" }}
      </div>
      <dropdown :open="openDropdown">
        <span class="dropdown-item-text text-muted text-uppercase dropdown-title">Welcome</span>
        <div @click="openDropdown = false">
          <router-link :to="{ name: 'profile' }" tag="a" class="dropdown-item">
            <i class="fas fa-user-edit mr-2"></i>{{ $t("menu.profile") }}
          </router-link>
        </div>
        <div class="dropdown-divider"></div>
        <span class="dropdown-item" @click="signOut()">
          <i class="fas fa-sign-out-alt mr-2"></i>{{ $t("auth.log_out") }}
        </span>
      </dropdown>
    </div>
  </nav>
</template>

<script>
import Dropdown from "@/components/dropdown/Dropdown";

export default {
  name: "Header",
  components: { Dropdown },
  props: { showSidenavButton: Boolean },
  data: function() {
    return {
      openDropdown: false
    };
  },
  methods: {
    signOut: function() {
      this.$auth.signOut().then(() => {
        this.$router.push({
          name: "home"
        });
      });
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/bootstrap/bootstrap.defaults";
.navbar-default {
  min-height: $sidebar-brand-height;
  position: sticky;
  top: 0;
  z-index: 1000;
}
@media screen and (min-width: 1200px) {
  .navbar-default {
    padding-left: calc(#{$sidebar-width} + 1rem);
  }
}
</style>
