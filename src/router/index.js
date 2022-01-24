import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/tickets",
    component: () => import("@/views/layout/Layout"),
    children: [
      {
        path: "/tickets",
        name: "tickets",
        component: () => import("@/views/pages/ticket/Index"),
        meta: { label: "Tickets" },
      },
      {
        path: "/employees",
        name: "employees",
        component: () => import("@/views/pages/employee/Index"),
        meta: { label: "Employees" },
      },
      {
        path: "/reports",
        name: "reports",
        component: () => import("@/views/pages/report/Index"),
        meta: { label: "reports" },
      },
    ],
  },
  {
    path: "/",
    component: () => import("../views/pages/auth/Index"),
    children: [
      {
        name: "login",
        path: "/login",
        component: () => import("@/views/pages/auth/Index"),
        meta: { label: "Login" },
      },
    ],
  },
  {
    path: "*",
    redirect: "/404",
  },
  {
    // the 404 route, when none of the above matches
    path: "/404",
    name: "404",
    component: () => import("@/views/pages/error/Index"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
