<template>
  <div class="container--center">
    <div>
      <h1>Flask Vue Boilerplate</h1>
      <img alt="Flask logo" src="../assets/logo-flask.png" height="200" />
      <img alt="Vue logo" src="../assets/logo-vue.png" height="200" />
      <div>
        <router-link tag="button" class="btn btn-primary" :to="{ name: 'login' }">
          Authentication
        </router-link>
      </div>
    </div>
  </div>
</template>
