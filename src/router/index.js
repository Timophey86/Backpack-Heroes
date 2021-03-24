import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home.vue"
import loginSignup from "../views/login-signup.vue";
import projectApp from "../views/project-app.vue";
import projectDetails from "../views/project-details.vue";
import projectEdit from "../views/project-edit.vue";
import userDetails from "../views/user-details.vue";
import about from "../views/about.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },
  {
    path: "/login-signup",
    name: "login-signup",
    component: loginSignup,
  },
  {
    path: "/project/:id",
    name: "project-details",
    component: projectDetails,
  },
  {
    path: "/project",
    name: "project",
    component: projectApp,
  },
  {
    path: "/edit/:projId?",
    name: "project-edit",
    component: projectEdit,
  },
  {
    path: "/user/:userId",
    name: "user-details",
    component: userDetails,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
