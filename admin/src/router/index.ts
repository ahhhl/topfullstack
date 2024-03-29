import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Main from '../views/Main.vue';
import HomeView from '../views/HomeView.vue';
import CourseList from '@/views/courses/CourseList.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    children: [
      {
        name: 'home',
        path: '/',
        component: HomeView,
      },
      {
        name: 'course-list',
        path: '/courses/list',
        component: CourseList,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
