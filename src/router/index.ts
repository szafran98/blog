import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '@/components/auth/Login.vue';
import PostForm from '@/views/PostForm.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/tag/:tagName',
    name: 'PostsOnTag',
    component: Home,
    props: true,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/add-post',
    name: 'AddPost',
    component: PostForm,
  },
  {
    path: '/edit-post/:id',
    name: 'EditPost',
    component: PostForm,
    props: (route) => ({ id: Number(route.params.id) }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
