<template>
  <div class="auth-card px-3">
    <div class="card bg-light border-0">
      <transition name="fade" mode="out-in">
        <div class="card-body px-lg-4 py-4" v-if="!newPasswordSet">
          <div class="text-center">
            <h2>{{ $t("auth.activate.title") }}</h2>
            <div v-if="verifying">
              <div class="mb-3">{{ $t("auth.activate.verifying_token") }}</div>
              <div class="spinner-border text-primary" role="status"></div>
            </div>
            <div v-else-if="error">
              <div class="mb-3">
                {{ $t("auth.activate.verification_error") }}
              </div>
              <div class="mb-3">
                <router-link tag="button" class="btn btn-primary" to="home">
                  {{ $t("navigation.back_to_home_page") }}
                </router-link>
              </div>
            </div>
            <div v-else>
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
                  :value="$t('auth.activate.activate')"
                  :disabled="!valid || loading"
                  @click="activate"
                />
              </form>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { authApi } from "@/api/auth";
import { ERROR_CODES, getNetworkErrorCode } from "@/api/util/network-errors";
import i18n from "@/languages";
import PasswordRequirements from "@/components/auth/PasswordRequirements";
import TextField from "@/components/form/TextField";
export default {
  name: "ActivateCard",
  components: { TextField, PasswordRequirements },
  data: function() {
    return {
      newPasswordSet: false,
      valid: false,
      password: "",
      repeatPassword: "",
      error: false,
      verifying: true,
      loading: false
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.verifyActivationToken();
    });
  },
  methods: {
    verifyActivationToken: function() {
      authApi
        .verifyActivationToken(this.$route.params.token)
        .then(() => {
          this.verifying = false;
        })
        .catch(error => {
          setTimeout(() => {
            const status = getNetworkErrorCode(error);
            if (status === ERROR_CODES.NOT_FOUND) {
              this.$notify.warning(i18n.t("auth.activate.unknown_code"));
              this.$router.push({
                name: "home"
              });
            } else {
              this.error = true;
              this.verifying = false;
            }
          }, 500);
        });
    },
    passwordRequirements: function(valid) {
      this.valid = valid;
    },
    activate: function() {
      this.loading = true;
      this.$auth
        .activate(this.$route.params.token, this.password, this.repeatPassword)
        .then(() => {
          this.$router.push({
            name: "login"
          });
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
