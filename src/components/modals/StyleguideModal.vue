<template>
  <modal-wrapper modalClass="modal" :modalName="name">
    <form class="form">
      <div class="modal__header">
        <h3>Styleguide modal</h3>
      </div>
      <div class="modal__content">
        <div class="form__group">
          <label class="form__label">This is a dropdown</label>
          <v-select
            v-model="selected1"
            :options="['Dropdown Item 1', 'Dropdown Item 2', 'Dropdown Item 3']"
            value="Item 1"
            placeholder="Choose an item..."
          ></v-select>
        </div>

        <hr />

        <h2>Extra header</h2>
        <div class="form__group">
          <label class="form__label">This is another dropdown</label>
          <v-select
            v-model="selected2"
            :options="['Dropdown Item 1', 'Dropdown Item 2', 'Dropdown Item 3']"
            placeholder="Choose an item..."
          ></v-select>
        </div>
        <div class="form__group">
          <label class="form__label">This is one more dropdown</label>
          <v-select
            v-model="selected3"
            :options="['Dropdown Item 1', 'Dropdown Item 2', 'Dropdown Item 3']"
            placeholder="Choose an item..."
          ></v-select>
        </div>
        <div class="form__group">
          <label class="form__label">
            This is a dropdown to select multiple items
          </label>
          <v-select
            multiple
            v-model="selected4"
            :options="[
              'Multiple dropdown Item 1',
              'Multiple dropdown Item 2',
              'Multiple dropdown Item 3'
            ]"
            placeholder="Add item"
          ></v-select>
        </div>

        <hr />

        <h2>Another header</h2>

        <div class="form__group">
          <div class="form__label">Description text input</div>
          <input
            class="form__input--text"
            type="text"
            placeholder="Enter description (optional)..."
          />
        </div>
        <div class="form__group">
          <label class="form__label">Description textarea</label>
          <textarea
            class="form__input--textarea"
            placeholder="Enter remarks (optional)..."
          ></textarea>
        </div>
      </div>
      <div class="modal__footer">
        <button class="button--cta" type="submit">Add / Save</button>
        <button class="button--alt" type="button" @click="$modal.hide(name)">
          Cancel
        </button>
      </div>
    </form>
  </modal-wrapper>
</template>

<script>
import ModalWrapper from "@/components/general/ModalWrapper";
import vSelect from "vue-select";

export default {
  name: "styleguide-modal",
  components: { ModalWrapper, vSelect },
  data: function() {
    return {
      name: "styleguide-modal",
      selected1: null,
      selected2: null,
      selected3: null,
      selected4: null
    };
  }
};
</script>
