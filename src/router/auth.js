const DummyPage = () => import("@/pages/Dummy.vue");

const authRoutes = {
  path: "/auth",
  name: "auth",
  component: DummyPage,
  children: [
    {
      path: "activate/:token",
      component: DummyPage,
      name: "activate"
    },
    {
      path: "set",
      component: DummyPage,
      name: "set"
    },
    {
      path: "reset",
      component: DummyPage,
      name: "reset"
    },
    {
      path: "reset/:token",
      component: DummyPage,
      name: "reset/token"
    }
  ]
};
export default authRoutes;
