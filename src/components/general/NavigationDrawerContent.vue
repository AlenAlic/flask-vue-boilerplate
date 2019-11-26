<template>
  <div>
    <v-list>
      <v-list-item link v-for="item in items" :key="item.title" :to="item.to" active-class="accent">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import i18n from "@/languages";
export default {
  name: "NavigationDrawerContent",
  props: { initialDrawer: null },
  data() {
    return {
      items: [
        { to: "dashboard", title: i18n.t("menu.dashboard"), icon: "mdi-view-dashboard" },
        { to: "page1", title: "Page 1", icon: "mdi-atom" },
        { to: "page2", title: "Page 2", icon: "mdi-flask-empty-outline" },
        { to: "etc", title: "Etc.", icon: "mdi-radioactive" }
      ],
      drawer: this.initialDrawer
    };
  }
};
</script>

<style scoped></style>
