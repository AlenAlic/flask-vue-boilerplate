<template>
  <div class="auth-card px-3">
    <div class="card bg-light border-0">
      <transition name="fade" mode="out-in">
        <div class="card-body px-lg-4 py-4" v-if="!newPasswordSet">
          <div class="text-center">
            <h2>{{ $t("auth.change_password") }}</h2>
          </div>
          <form class="form" @submit.prevent="login">
            <TextField
              icon="fas fa-unlock-alt"
              :placeholder="$t('auth.password')"
              type="password"
              v-model="password"
            ></TextField>
            <TextField
              icon="fas fa-unlock-alt"
              :placeholder="$t('auth.repeat_password')"
              type="password"
              v-model="repeatPassword"
            ></TextField>
            <password-requirements
              class="text-left"
              ref="req"
              :password="password"
              :repeat_password="repeatPassword"
              @requirements="passwordRequirements"
            />
            <input
              class="btn btn-primary"
              :value="$t('auth.request_new_password')"
              :disabled="!valid || loading"
              @click="changePassword"
            />
          </form>
          <router-link tag="button" class="btn btn-outline-dark mt-2" :to="{ name: 'login' }">
            {{ $t("general.cancel") }}
          </router-link>
        </div>
        <div v-else class="card-body">
          <div class="text-center">
            <h2>{{ $t("auth.new_password_set.title") }}</h2>
            <p>{{ $t("auth.new_password_set.text") }}</p>
          </div>
          <router-link tag="button" class="btn btn-outline-dark mt-2" :to="{ name: 'login' }">
            {{ $t("navigation.back_to_login_page") }}
          </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import PasswordRequirements from "@/components/auth/PasswordRequirements";
import { ERROR_CODES, getNetworkErrorCode } from "@/api/util/network-errors";
import i18n from "@/languages";
import TextField from "@/components/form/TextField";
export default {
  name: "PasswordResetCard",
  components: { PasswordRequirements, TextField },
  data: function() {
    return {
      newPasswordSet: false,
      valid: false,
      token: "",
      password: "",
      repeatPassword: "",
      error: null,
      loading: false
    };
  },
  methods: {
    passwordRequirements: function(valid) {
      this.valid = valid;
    },
    changePassword: function() {
      this.loading = true;
      this.$auth
        .resetPassword(this.$route.params.token, this.password, this.repeatPassword)
        .then(() => {
          this.newPasswordSet = true;
        })
        .catch(error => {
          const status = getNetworkErrorCode(error);
          if (status === ERROR_CODES.BAD_REQUEST) this.$notify.error(i18n.t("auth.activate.error"));
          this.loading = false;
        });
    }
  }
};
</script>
