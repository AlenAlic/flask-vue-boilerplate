const Authentication = () => import("@/components/auth/Authentication.vue");
const LoginCard = () => import("@/components/auth/cards/LoginCard.vue");
const ActivateCard = () => import("@/components/auth/cards/ActivateCard.vue");
const PasswordForgottenCard = () => import("@/components/auth/cards/PasswordForgottenCard.vue");
const PasswordResetCard = () => import("@/components/auth/cards/PasswordResetCard.vue");

const authRoutes = {
  path: "/auth",
  component: Authentication,
  children: [
    {
      path: "/",
      name: "login",
      component: LoginCard
    },
    {
      path: "activate/:token",
      component: ActivateCard,
      name: "activate"
    },
    {
      path: "password/reset",
      component: PasswordForgottenCard,
      name: "reset"
    },
    {
      path: "password/reset/:token",
      component: PasswordResetCard,
      name: "reset/token"
    }
  ]
};
export default authRoutes;
