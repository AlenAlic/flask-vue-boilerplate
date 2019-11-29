<template>
  <div class="container--center">
    <div>
      <h2>{{ $t("navigation.page_not_found") }}</h2>
      <div>
        <router-link :to="{ name: 'home' }" tag="button" class="btn btn-primary">
          {{ $t("navigation.go_back") }}
        </router-link>
      </div>
    </div>
  </div>
</template>
