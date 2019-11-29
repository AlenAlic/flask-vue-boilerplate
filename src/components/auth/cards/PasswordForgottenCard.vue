<template>
  <div class="auth-card px-3">
    <div class="card bg-light border-0">
      <transition name="fade" mode="out-in">
        <div class="card-body px-lg-4 py-4" v-if="!newPasswordSent">
          <div class="text-center">
            <h2>{{ $t("auth.request_new_password") }}</h2>
          </div>
          <form class="form w-100" @submit.prevent="requestPassword">
            <TextField
              v-model="email"
              :rules="emailRules"
              icon="fas fa-envelope"
              :placeholder="$t('auth.email')"
              type="email"
            ></TextField>
            <input
              class="btn btn-primary"
              type="submit"
              :value="$t('auth.request_new_password')"
              :disabled="!$util.isEmail(email)"
              @click="requestPassword"
            />
          </form>
          <router-link tag="button" class="btn btn-outline-dark mt-2" :to="{ name: 'login' }">
            {{ $t("general.cancel") }}
          </router-link>
        </div>
        <div v-else class="card-body">
          <div class="text-center">
            <h2>{{ $t("auth.password_reset_email_sent.title") }}</h2>
            <p>{{ $t("auth.password_reset_email_sent.text") }}</p>
          </div>
          <router-link role="button" class="btn btn-outline-dark mt-2" :to="{ name: 'login' }">
            <small>{{ $t("navigation.back_to_login_page") }}</small>
          </router-link>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { authApi } from "@/api/auth";
import TextField from "@/components/form/TextField";
export default {
  name: "PasswordForgottenCard",
  components: { TextField },
  data: function() {
    return {
      newPasswordSent: false,
      valid: false,
      email: "",
      emailRules: [v => this.$util.isEmail(v) || this.$t("auth.errors.valid_email")],
      error: null,
      loading: false
    };
  },
  methods: {
    requestPassword: function() {
      this.loading = true;
      authApi.resetPasswordRequest(this.email).then(() => {
        this.newPasswordSent = true;
      });
    }
  }
};
</script>
