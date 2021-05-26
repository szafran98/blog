import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '@/components/auth/Login.vue';
import PostForm from '@/views/PostForm.vue';
import Post from '@/components/post/Post.vue';
import ReadingList from '@/views/ReadingList.vue';

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
    path: '/post/:id',
    name: 'Post',
    component: Post,
    props: (route) => ({ id: Number(route.params.id) }),
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
  {
    path: '/reading-list',
    name: 'ReadingList',
    component: ReadingList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
