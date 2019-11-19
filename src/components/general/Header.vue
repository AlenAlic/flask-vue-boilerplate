<template>
  <header class="header">
    <div class="container">
      <router-link :to="{ name: 'home' }" class="header__logo">
        <img src="../../assets/logo-vue.png" alt="FVB" height="32px" />
      </router-link>
      <nav class="nav">
        <ul>
          <li class="nav__item">
            <router-link :to="{ name: 'dashboard' }" class="nav__link">
              {{ $t("menu.dashboard") }}
            </router-link>
          </li>
        </ul>
      </nav>

      <button @click="signOut" class="header__logout">
        {{ $t("menu.signout") }}
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
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
