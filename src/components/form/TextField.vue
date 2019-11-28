<template>
  <div class="form-group">
    <div class="input-group mb-3">
      <div class="input-group-prepend" v-if="!!icon">
        <span class="input-group-text"><i :class="icon"></i></span>
      </div>
      <input
        class="form-control"
        :class="{ 'is-invalid': error && applyRules }"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        required
        :type="type"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @focusout="applyRules = true"
      />
      <div class="invalid-feedback" v-if="error && applyRules">{{ error }}</div>
      <div class="w-100" v-else-if="description">
        <small class="text-muted">{{ description }}</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    icon: { type: String, default: "" },
    description: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    type: { type: String, default: "text" },
    name: String,
    value: String,
    rules: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data: () => ({
    applyRules: false
  }),
  computed: {
    error() {
      let r;
      for (r of this.rules) {
        if (r(this.value).hasOwnProperty("length")) {
          return r(this.value);
        }
      }
      return false;
    }
  }
};
</script>

<style scoped></style>
