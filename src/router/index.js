import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import QuestionDetailView from "../views/QuestionDetailView.vue";
import SignInView from "../views/SignInView.vue";
import StudentDetailView from "../views/StudentDetailView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/questions/:qid",
    name: "questionDetail",
    component: QuestionDetailView,
  },
  {
    path: "/students/:sid",
    name: "StudentDetail",
    component: StudentDetailView,
  },
  {
    path: "/sign-in",
    name: "signIn",
    component: SignInView,
  },

  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
