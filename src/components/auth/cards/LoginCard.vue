<template>
  <div class="auth-card px-3">
    <div class="card bg-light border-0">
      <div class="card-body px-lg-4 py-4">
        <div class="text-center">
          <h2>Title</h2>
          <h4 class="mb-4">Sign in</h4>
        </div>
        <form class="form" @submit.prevent="login">
          <TextField
            icon="fas fa-envelope"
            :placeholder="$t('auth.email')"
            type="email"
            v-model="email"
            :rules="emailRules"
          ></TextField>
          <TextField
            icon="fas fa-unlock-alt"
            :placeholder="$t('auth.password')"
            type="password"
            v-model="password"
          ></TextField>
          <div class="text-center">
            <input
              class="btn btn-primary"
              id="submit"
              name="submit"
              type="submit"
              :value="$t('auth.log_in')"
            />
          </div>
        </form>
      </div>
    </div>
    <div class="card_subtitle text-left mt-3">
      <router-link class="text-light" :to="{ name: 'reset' }">
        <small>{{ $t("auth.forgot_password") }}</small>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ERROR_CODES, getNetworkErrorCode } from "@/api/util/network-errors";
import i18n from "@/languages";
import TextField from "@/components/form/TextField";
export default {
  name: "LoginCard",
  components: { TextField },
  data: function() {
    return {
      valid: false,
      email: "",
      emailRules: [v => this.$util.isEmail(v) || this.$t("auth.errors.valid_email")],
      password: "",
      passwordRules: [v => !!v || this.$t("auth.errors.password_required")],
      rememberMe: false,
      errors: null,
      loading: false
    };
  },
  methods: {
    login: function() {
      this.error = null;
      this.loading = true;
      this.$auth
        .signInWithUsernameAndPassword(this.email, this.password, this.rememberMe)
        .then(() => {
          this.$router.push({
            name: "dashboard"
          });
        })
        .catch(error => {
          const status = getNetworkErrorCode(error);
          if (status === ERROR_CODES.UNAUTHORIZED)
            this.$notify.error(i18n.t("auth.errors.invalid_login"));
          else if (status === ERROR_CODES.FORBIDDEN)
            this.$notify.error(i18n.t("auth.errors.inactive_account"));
          this.loading = false;
        });
    }
  }
};
</script>
