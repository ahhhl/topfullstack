import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Main from '../views/Main.vue';
import HomeView from '../views/HomeView.vue';
import ResourceCrud from '@/views/ResourceCrud.vue';
import CourseList from '@/views/courses/CourseList.vue';
import CourseEdit from '@/views/courses/CourseEdit.vue';

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
        name: 'resource-list',
        path: '/:resource/list',
        component: ResourceCrud,
        props: true,
      },
      // {
      //   name: 'episode-list',
      //   path: '/:resource/list',
      //   component: ResourceCrud,
      //   props: true,
      // },
      // {
      //   name: 'course-list',
      //   path: '/courses/list',
      //   component: CourseList,
      // },
      // {
      //   name: 'course-edit',
      //   path: '/courses/edit/:id',
      //   component: CourseEdit,
      //   props: true,
      // },
      // {
      //   name: 'course-create',
      //   path: '/courses/create',
      //   component: CourseEdit,
      // },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
