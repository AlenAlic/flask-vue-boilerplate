<template>
  <input class="btn btn-primary" :value="text" />
</template>

<script>
export default {
  name: "SubmitButton",
  props: { text: String }
};
</script>
