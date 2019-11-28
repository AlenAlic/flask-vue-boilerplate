<template>
  <div class="form-check mb-3">
    <input class="form-check-input" type="checkbox" value="y" :id="name" />
    <label class="form-check-label" :for="name">
      {{ text }}
    </label>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  props: { name: String, text: String }
};
</script>
