
// export default router

import { createRouter, createWebHistory } from "vue-router";

import AddBookPage from "@/views/AddBookPage.vue";
import CatalogPageAdmin from "@/views/CatalogPage_Admin.vue";
import ForgotPwd from "@/views/ForgotPwd.vue";
import HelloWorld from "@/views/HelloWorld.vue";
import HelpPage from "@/views/HelpPage.vue";
import InfoPage from "@/views/InfoPage.vue";
import LandingPage from "@/views/LandingPage.vue";
import Login from "@/views/Login.vue";
import OrgInfoPage from "@/views/OrgInfoPage.vue"
import ProfilePage from "@/views/UserProfilePage.vue";
import Register from "@/views/Register.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import ResetPwd from "@/views/ResetPwd.vue";

const routes = [

  {
    path: "/add-video-page",
    name: "AddVideoPage",
    component: AddBookPage,
  },
  {
    path: "/video-info-page",
    name: "InfoPag",
    component: InfoPage
  },
  {
    path: "/game-info-page",
    name: "GameInfoPage",
    component: InfoPage,
  },
  {
    path: "/organization-info-page",
    name: "OrgInfoPage",
    component: OrgInfoPage,
  },
  {
    path: "/video-catalog-page",
    name: "VideoCatalogPage",
    component: CatalogPageAdmin,
  },
  {
    path: "/game-catalog-page",
    name: "GameCatalogPage",
    component: CatalogPageAdmin,
  },
  {
    path: "/organization-catalog-page",
    name: "OrganizationCatalogPageAdmin",
    component: CatalogPageAdmin,
  },
  {
    path: "/fgpassword-page",
    name: "ForgotPwdPage",
    component: ForgotPwd,
  },
  {
    path: "/",
    name: "HelloWorld'",
    component: HelloWorld,
  },
  {
    path: "/help-page",
    name: "HelpPage",
    component: HelpPage,
  },
  {
    path: "/landing-page",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/login-page",
    name: "LoginPage",
    component: Login,
  },
  {
    path: "/register-page",
    name: "RegisterPage",
    component: Register,
  },
  {
    path: "/reset-password-page",
    name: "ResetPasswordPage",
    component: ResetPassword,
  },
  {
    path: "/reset-pwd-page",
    name: "ResetPwdPage",
    component: ResetPwd,
  },
  {
    path: "/profile-page",
    name: "ProfilePage",
    component: ProfilePage,
  },
  // {
  //   path: '/:catchAll(.*)',
  //   redirect: '/landing-page'
  // }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
// Permet de vérifier si l'utilisateur est connecté, si il ne l'est pas, il est redirigé vers la page de connexion
// router.beforeEach((to, from, next) => {
//   const userData = JSON.parse(localStorage.getItem("userData"));
//   console.log("userdata  ",userData);

  // if (!userData && to.path !== '/login-page' && to.path !== '/register-page' && to.path !== '/fgpassword-page' && to.path !== '/reset-password-page' && to.path !== '/reset-pwd-page' && to.path !== '/landing-page' && to.path !== '/book-read-page' && to.path !== '/help-page') {
  //   next("/landing-page"); // Redirige vers la page de connexion
  // } else {
  //   next(); // Continue la navigation normalement
  // }
// });


export default router;