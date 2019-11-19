<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <span class="cookie_bar__text">
          This website uses cookies to improve the user experience
        </span>
        <button class="button--cta" @click="confirm">
          I understand
        </button>
        <button class="button--link">More information</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cookie-banner",
  methods: {
    confirm() {
      this.$emit("confirm");
    }
  }
};
</script>
