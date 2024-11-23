import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import ForgotPassword from "@/views/forgotPassword.vue";
import Inspire from "@/views/inspire.vue";
import Login from "@/views/login.vue";
import ResetPassword from "@/views/resetPassword.vue";
import ShowAll from "@/views/admin/inquiry/showAll.vue";
import RegisterAdminRole from "@/views/admin/users/registerAdminRole.vue";
import ShowRoles from "@/views/admin/users/showRoles.vue";
import Index from "@/views/index.vue";
import AdminUserEdit from "@/views/admin/users/edit/_id.vue";
import AdminCreate from "@/views/admin/users/create.vue";
import AdminUser from "@/views/admin/users/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/forgotPassword",
    component: ForgotPassword,
    name: "forgotPassword",
  },
  {
    path: "/inspire",
    component: Inspire,
    name: "inspire",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
  },
  {
    path: "/resetPassword",
    component: ResetPassword,
    name: "resetPassword",
  },
  {
    path: "/admin/users",
    component: AdminUser,
    name: "admin-users",
  },
  {
    path: "/admin/inquiry/showAll",
    component: ShowAll,
    name: "admin-inquiry-showAll",
  },
  {
    path: "/admin/users/create",
    component: AdminCreate,
    name: "admin-users-create",
  },
  {
    path: "/admin/users/registerAdminRole",
    component: RegisterAdminRole,
    name: "admin-users-registerAdminRole",
  },
  {
    path: "/admin/users/showRoles",
    component: ShowRoles,
    name: "admin-users-showRoles",
  },
  {
    path: "/",
    component: Index,
    name: "index",
  },
  {
    path: "/admin/users/edit/:id?",
    component: AdminUserEdit,
    name: "admin-users-edit-id",
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
