<template>
  <modal-wrapper modalClass="modal--small" :modalName="name">
    <div class="modal__header">
      <h3>Cookies</h3>
    </div>
    <div class="modal__content">
      This website uses cookies to improve the user experience.
    </div>
    <div class="modal__footer">
      <button class="button--cta" type="submit" @click="confirm">
        I understand
      </button>
    </div>
  </modal-wrapper>
</template>
<script>
import ModalWrapper from "@/components/general/ModalWrapper";

export default {
  name: "cookie-modal",
  components: { ModalWrapper },
  data: function() {
    return {
      name: "cookie-modal"
    };
  },
  methods: {
    confirm: function() {
      this.$emit("confirm");
      this.$modal.hide(this.name);
    }
  }
};
</script>
