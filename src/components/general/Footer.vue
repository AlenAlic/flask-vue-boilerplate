<template>
  <footer class="footer">
    <img class="footer__logo" src="../../assets/logo-vue.png" alt="FVB" title="FVB" height="32px" />
    <div class="footer__text">
      &copy; {{ new Date().getFullYear() }} {{ $t("footer.copyrights") }}
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer"
};
</script>
