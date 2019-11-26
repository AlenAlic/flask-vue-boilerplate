<template>
  <v-row align="center" justify="center">
    <v-col cols="12" class="text-center">
      <h1>Flask Vue Boilerplate</h1>
      <img alt="Flask logo" src="../assets/logo-flask.png" height="200" />
      <img alt="Vue logo" src="../assets/logo-vue.png" height="200" />
    </v-col>
    <v-col cols="12" class="text-center">
      <router-link tag="span" to="auth">
        <v-btn color="primary">
          Authentication
        </v-btn>
      </router-link>
    </v-col>
  </v-row>
</template>
