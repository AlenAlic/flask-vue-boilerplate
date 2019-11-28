import Vue from "vue";
import VueRouter from "vue-router";

// Pages
const Home = () => import("@/pages/Home.vue");
const Styleguide = () => import("@/pages/Styleguide.vue");
const PageNotFound = () => import("@/pages/PageNotFound.vue");
const DummyPage = () => import("@/pages/Dummy.vue");

// Pages modules
import authPages from "@/router/modules/auth";
import userRoutes from "@/router/modules/user";

Vue.use(VueRouter);

const routes = [
  {
    path: "/index.html",
    alias: "/",
    component: Home
  },
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/styleguide",
    name: "styleguide",
    component: Styleguide,
    meta: {
      auth: false,
      debugRoute: true
    }
  },
  authPages,
  userRoutes,
  {
    path: "/dashboard",
    name: "dashboard",
    component: DummyPage,
    meta: {
      auth: true
    }
  },
  {
    path: "/page1",
    name: "page1",
    component: DummyPage,
    meta: {
      auth: true
    }
  },
  {
    path: "/page2",
    name: "page2",
    component: DummyPage,
    meta: {
      auth: true
    }
  },
  {
    path: "/etc",
    name: "etc",
    component: DummyPage,
    meta: {
      auth: true
    }
  },
  {
    path: "**",
    name: "PageNotFound",
    component: PageNotFound
  }
];

const router = new VueRouter({
  mode: "history",
  linkActiveClass: "is-active",
  linkExactActiveClass: "primary",
  routes
});

/**
 * Handle routes that need authentication
 */
router.beforeEach((to, from, next) => {
  if (!Vue.prototype.$auth.isAuthenticated) {
    if (to.meta && to.meta.auth) {
      next({
        name: "home",
        query: {
          redirect: to.path
        }
      });
      // return;
    }
  } else {
    if (to.name === "home") {
      next({
        name: "dashboard",
        query: {
          redirect: to.path
        }
      });
    }
  }
  next();
});

/**
 * Disable debug routes on production
 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.debugRoute)) {
    if (!Vue.prototype.$config.debug) {
      next({
        name: "home",
        query: {
          redirect: to.path
        }
      });
      return;
    }
  }
  next();
});

export default router;
