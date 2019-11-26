const DummyPage = () => import("@/pages/Dummy.vue");

const userRoutes = {
  path: "/profile",
  name: "profile",
  component: DummyPage,
  meta: {
    auth: true
  }
};
export default userRoutes;
