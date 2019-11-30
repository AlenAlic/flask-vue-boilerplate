<template>
  <div class="mx-auto">
    <v-card max-width="400">
      <v-form ref="form" v-model="valid" @submit.prevent="login">
        <v-card-title>{{ $t("auth.log_in") }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            :label="$t('auth.email')"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :label="$t('auth.password')"
            required
            type="password"
          ></v-text-field>
          <v-checkbox v-model="rememberMe" :label="$t('auth.remember_me')" required></v-checkbox>
        </v-card-text>
        <v-card-actions>
          <v-btn
            :disabled="!valid || loading"
            :loading="loading"
            color="primary"
            text
            @click="login"
            type="submit"
          >
            {{ $t("auth.log_in") }}
          </v-btn>
          <router-link tag="span" :to="{ name: 'home' }">
            <v-btn text>
              {{ $t("general.cancel") }}
            </v-btn>
          </router-link>
        </v-card-actions>
      </v-form>
    </v-card>
    <router-link tag="span" :to="{ name: 'reset' }">
      <v-btn text class="mt-2">
        {{ $t("auth.forgot_password") }}
      </v-btn>
    </router-link>
  </div>
</template>

<script>
import { ERROR_CODES, getNetworkErrorCode } from "@/api/util/network-errors";
import i18n from "@/languages";
export default {
  name: "LoginCard",
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
