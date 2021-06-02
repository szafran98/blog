<template>
  <section :id="'post-' + post.id" class="post">
    <PostModal
      :author="post.author"
      :likesCount="post.likes_count"
      @like-post="like"
    />
    <PostHeader :post="post" />
    <PostContent :content="post.content" />
    <PostFooter :post="post" />
  </section>
</template>

<script lang="ts">
import {
  onBeforeMount,
  onMounted,
  defineComponent,
  toRefs,
  computed,
  inject,
  reactive,
  ref,
  h,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import { usePosts } from '@/composable/usePosts';
import { app } from '@/main';
import marked from 'marked';
//import '@/assets/prism.css';

//import highlight from 'highlight.js';
//import hljs from 'highlight.js/lib/core';
//import 'highlight.js/styles/monokai.css';
//import typescript from 'highlight.js/lib/languages/typescript';
import { PostResponse } from '@/types/types';
import { useTippy } from 'vue-tippy';
import PostDropdownMenu from '@/components/Post/PostDropdownMenu.vue';
//import { highlightAll } from 'prismjs';

//hljs.registerLanguage('typescript', typescript);

import * as Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism-tomorrow.css';
import PostHeader from '@/components/Post/PostHeader.vue';
import PostContent from '@/components/Post/PostContent.vue';
import PostFooter from '@/components/Post/PostFooter.vue';
import PostModal from '@/components/Post/PostModal.vue';
import { MutationTypes } from '@/store/mutation-types';
import { AxiosResponse } from 'axios';

export default defineComponent({
  name: 'Post',
  components: { PostModal, PostFooter, PostContent, PostHeader },
  props: {
    id: Number,
  },
  async setup(props: any) {
    const store = useStore();

    onMounted(() => {
      setTimeout(() => Prism.highlightAll());
    });

    const { getPostsByTag, deletePost, getPost, likePost } = usePosts();

    const post = reactive({
      ...(await getPost(props.id)),
    }) as PostResponse;

    const like = () => {
      likePost(post.id).then((res: any) => {
        console.log(props.id);
        console.log({ id: props.id, ...res.data });
        Object.assign(post, { ...res.data });
      });
    };

    return {
      post,
      like,
    };
  },
});
</script>

<style scoped lang="scss">
.post {
  margin-top: 4em;
  margin-left: 1.5em;
  margin-right: 1.5em;
}

@include respond-to(large) {
  .post {
    max-width: 680px;
    margin: auto;
  }
}
</style>
