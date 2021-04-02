<template>
  <div id="home-container" style="display: flex">
    <div class="posts" style="width: min-content">
      <h1 class="content-subhead">
        Recent posts <template v-if="tagName">on {{ tagName }}</template>
      </h1>
      <div v-for="post in posts" :key="post.id">
        <suspense>
          <!--<Post :postData="post" />-->
          <PostTrailer :postData="post" />
        </suspense>
      </div>
    </div>
    <PopularTags />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  inject,
  getCurrentInstance,
  watch,
} from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import Post from '@/components/post/Post.vue';
import PostTrailer from '@/components/post/PostTrailer.vue';
import PopularTags from '@/components/PopularTags.vue';
import PostForm from '@/views/PostForm.vue';
import CodeSnippet from '@/components/CodeSnippet.vue';
import { usePosts } from '@/composable/usePosts';
import * as Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism-tomorrow.css';
import router from '@/router';
export default defineComponent({
  name: 'Home',
  components: {
    //Post,
    PostTrailer,
    PopularTags,
  },
  props: {
    tagName: String || null,
  },
  setup: async function () {
    //const store = useStore()

    const { posts, getPosts, getPostsByTag } = usePosts();
    const isLogged = inject('isLogged');

    const route = useRoute();

    onMounted(() => {
      Prism.highlightAll();
    });

    watch(
      () => route.name,
      (name) => {
        console.log(name);
        if (name === 'PostsOnTag') {
          const tagName = String(route.params.tagName);
          getPostsByTag(tagName);
        } else if (name === 'Home') {
          getPosts();
        }
      },
    );

    //const posts = computed(() => store.getters.posts)

    //const getPosts = () => store.dispatch(ActionTypes.GET_POSTS)
    /*
    async function getPosts() {
      console.log(store)
      await store.dispatch(ActionTypes.GET_POSTS)
    }

       */
    await getPosts();

    return {
      posts,
      isLogged,
    };
  },
});
</script>

<style lang="scss">
.home {
  @media (min-width: 48em) {
    .sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
    }
  }

  @media screen and (min-width: 48em) {
    .pure-u-md-1-4,
    .pure-u-md-6-24 {
      width: 20%;
      display: inline-block;
      letter-spacing: normal;
      word-spacing: normal;
      vertical-align: top;
      text-rendering: auto;
    }
  }

  .content-subhead {
    text-transform: uppercase;
    color: #aaa;
    border-bottom: 1px solid #eee;
    padding: 0.4em 0;
    font-size: 80%;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-align: left;
    width: 680px;
    //margin: auto;
    margin-bottom: 1rem;
  }

  .sidebar {
    background: rgb(61, 79, 93);
    color: #fff;
  }

  @media (min-width: 48em) {
    .content {
      padding: 2em 3em 0;
      margin-left: 20%;

      .post {
        width: 680px;
        margin: auto;
      }
    }
  }

  @media screen and (min-width: 48em) {
    .pure-u-md-18-24,
    .pure-u-md-3-4 {
      width: 80%;
      display: inline-block;
      letter-spacing: normal;
      word-spacing: normal;
      vertical-align: top;
      text-rendering: auto;
    }
  }

  .brand-title {
    text-transform: uppercase;
    margin: 0;
  }

  .brand-tagline {
    font-weight: 300;
    color: rgb(176, 202, 219);
    margin: 0;
  }

  pre {
    border: 0;
    border-radius: 0;
  }
}
</style>
