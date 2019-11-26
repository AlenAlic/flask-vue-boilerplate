<template>
  <v-app-bar dark app :clipped-left="$vuetify.breakpoint.mdAndUp" color="primary">
    <v-app-bar-nav-icon
      v-if="$vuetify.breakpoint.mdAndDown"
      @click.stop="$emit('toggleDrawer')"
    ></v-app-bar-nav-icon>

    <v-toolbar-title>Title</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-menu v-if="$auth.isAuthenticated" bottom left offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="() => {}" to="profile">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t("menu.profile") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="signOut()">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ $t("auth.log_out") }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-menu bottom left offset-y>
      <template v-slot:activator="{ on }">
        <v-btn icon color="accent" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import i18n from "@/languages";
export default {
  name: "Header",
  data: () => ({
    items: [
      { to: "dashboard", title: i18n.t("menu.dashboard"), icon: "mdi-view-dashboard" },
      { to: "page1", title: "Page 1", icon: "mdi-atom" },
      { to: "page2", title: "Page 2", icon: "mdi-flask-empty-outline" },
      { to: "etc", title: "Etc.", icon: "mdi-radioactive" }
    ]
  }),
  methods: {
    signOut: function() {
      this.$auth.signOut().then(() => {
        this.$router.push({
          name: "home"
        });
      });
    }
  }
};
</script>
