<template>
  <transition name="sidenav" mode="out-in">
    <nav class="sidebar sidebar-expand-lg overflow-auto show" v-if="drawer">
      <div class="sidebar-brand">
        <div @click="clickedLink">
          <router-link class="sidebar-link" :to="{ name: 'home' }">
            Title
          </router-link>
        </div>
        <button
          class="sidebar-close btn btn-outline-primary"
          type="button"
          @click="$emit('hideDrawer')"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="" id="sidebar">
        <div class="my-2"></div>
        <h6 class="sidebar-heading">Sidenav title</h6>
        <ul class="sidebar-nav">
          <router-link
            tag="li"
            class="sidebar-item"
            v-for="(item, i) in items"
            :key="i"
            :to="{ name: item.to }"
          >
            <div @click="clickedLink" class="sidebar-link">
              <!--            <router-link :to="{ name: item.to }" tag="a" class="sidebar-link">-->
              <i class="mr-2" :class="item.icon"></i>{{ item.title }}
              <!--            </router-link>-->
            </div>
          </router-link>
        </ul>
        <div class="my-5"></div>
      </div>
    </nav>
  </transition>
</template>

<script>
import i18n from "@/languages";
export default {
  name: "Sidenav",
  props: { drawer: Boolean },
  data: function() {
    return {
      items: [
        { to: "dashboard", title: i18n.t("menu.dashboard"), icon: "fas fa-columns" },
        { to: "page1", title: "Page 1", icon: "fas fa-atom" },
        { to: "page2", title: "Page 2", icon: "fas fa-cloud" },
        { to: "etc", title: "Etc.", icon: "fas fa-magic" }
      ]
    };
  },
  methods: {
    signOut: function() {
      this.$auth.signOut().then(() => {
        this.$router.replace({
          name: "home"
        });
      });
    },
    clickedLink: function() {
      this.$emit("clickedLink");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../assets/css/bootstrap/bootstrap.defaults";
.sidebar {
  min-height: 0;
  width: 100%;
  height: auto;
  margin-left: 0.75rem;
  margin-top: 0.75rem;
  max-width: calc(100% - 1.5rem);
  position: fixed;
  top: 0;
  left: 0;
  display: block;
  z-index: 1100;
  background-color: $white;
  -webkit-box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.8);
  -moz-box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.8);
  padding-top: 0.5rem;
  border-radius: 0.5rem;
  max-height: 85%;

  .sidebar {
    &-brand {
      justify-content: space-between;
      padding-right: 2rem;
    }
    &-link {
      width: auto;
    }
    &-item:hover {
      background-color: rgba($primary, 0.25);
    }
  }

  .sidebar {
    &-item,
    &-nav {
      list-style: none;
    }
    &-item,
    &-heading {
      padding: 0.625rem 1.75rem;
    }
    &-brand {
      height: 4rem;
      display: flex;
      align-items: center;
      padding-left: 1.75rem;
      font-size: 1.25rem;
      .sidebar-link {
        color: $dark;
      }
      .sidebar-link:focus,
      .sidebar-link:hover {
        text-decoration: none;
        color: $primary;
      }
    }

    &-link {
      color: $dark;
      width: 100%;
      display: block;
    }

    &-link:focus,
    &-link:hover {
      text-decoration: none;
    }

    &-nav {
      padding-left: 0;

      .sidebar-link > i {
        min-width: 2.25rem;
      }
    }

    &-heading {
      font-size: 0.75rem;
      padding-top: 0.25rem;
      padding-bottom: 0.25rem;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
  }
}

@media screen and (min-width: 1200px) {
  .sidebar {
    min-height: 100vh;
    width: 100%;
    margin-left: 0;
    margin-top: 0;
    max-width: $sidebar-width;
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    z-index: 1100;
    background-color: $white;
    -webkit-box-shadow: -2px 0 6px 0 rgba(0, 0, 0, 0.8);
    -moz-box-shadow: -2px 0 6px 0 rgba(0, 0, 0, 0.8);
    box-shadow: -2px 0 6px 0 rgba(0, 0, 0, 0.8);
    height: auto;
    padding-top: 0;
    border-radius: 0;

    .sidebar {
      &-item,
      &-nav {
        list-style: none;
      }
      &-item,
      &-heading {
        padding: 0.625rem 1.75rem;
      }
      &-brand {
        height: 4rem;
        display: flex;
        align-items: center;
        padding-left: 1.75rem;
        font-size: 1.25rem;
        .sidebar-link {
          color: $dark;
        }
        .sidebar-link:focus,
        .sidebar-link:hover {
          text-decoration: none;
          color: $primary;
        }
        .sidebar-close {
          display: none;
        }
      }

      &-link {
        color: $dark;
        width: 100%;
        display: block;
      }

      &-link:focus,
      &-link:hover {
        text-decoration: none;
        color: $primary;
      }

      &-nav {
        padding-left: 0;

        .sidebar-link > i {
          min-width: 2.25rem;
        }
      }

      &-heading {
        font-size: 0.75rem;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }
    }
  }
}
// Sidenav
.sidenav-enter-active,
.sidenav-leave-active {
  @include transition(transform 0.25s, ease-in-out);
  @include transform-origin(top);
}
.sidenav-enter-active {
  @include scaleY(1);
}

.sidenav-leave-active {
  @include scaleY(0);
}

.sidenav-enter,
.sidenav-leave {
  @include scaleY(0);
  @include transform-origin(top);
}
</style>
