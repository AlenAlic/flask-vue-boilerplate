<template>
  <div class="dropdown-menu dropdown-menu-right mr-3" :class="{ show: open }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Dropdown",
  props: { open: Boolean }
};
</script>

<style scoped lang="scss">
.dropdown-menu {
  margin-top: -0.75rem;
}
</style>
