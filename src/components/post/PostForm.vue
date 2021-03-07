<template>
  <div class="post-form-container">
    <!--<Editor
      api-key="yirqbw8h7cu3qp8csaht94rcx7ya5xsr03jcyyjkywp4qjgh"
      v-model="postContent"
      :init="{
        plugins: ['codesample'],
        toolbar:
          'codesample bold italic underline, link image, alignleft, aligncenter, alignright',
        codesample_global_prismjs: true,
      }"
    />-->
    <form
      action=""
      class="post-form"
      @submit.prevent="addPostPrismFix(postContent)"
    >
      <textarea
        name="new-post-input"
        id="new-post-input"
        cols="30"
        rows="10"
        v-model="postContent"
      ></textarea>
      <div id="compiled-md" v-html="compiledMarkdown"></div>
      <button type="submit">Add post</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import { usePosts } from '@/composable/usePosts';
import marked from 'marked';
//import * as Prism from 'prismjs';
/*
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';*/

import Editor from '@tinymce/tinymce-vue';

export default defineComponent({
  name: 'PostForm',
  components: {
    //Editor,
  },
  setup() {
    const { addPost } = usePosts();

    const postContent = ref('');

    const compiledMarkdown = computed(() => marked(postContent.value));

    const addPostPrismFix = (content: string) => {
      addPost(content).then(() => {
        return;
      });
    };

    return {
      addPost,
      addPostPrismFix,
      postContent,
      compiledMarkdown,
    };
  },
});
</script>

<style scoped lang="scss">
#compiled-md {
  background: #2d2d2d;
  color: white;
}
</style>
