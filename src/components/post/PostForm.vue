<template>
  <div class="post-form-container">
    <form action="" class="post-form" @submit.prevent="addPost(postContent)">
      <textarea
        name="new-post-input"
        id="new-post-input"
        cols="30"
        rows="10"
        v-model="postContent"
      ></textarea>
      <div v-html="compiledMarkdown"></div>
      <button type="submit">Add post</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { usePosts } from '@/composable/usePosts';
import marked from 'marked';
import hljs from 'highlight.js/lib/core';

export default defineComponent({
  name: 'PostForm',
  setup() {
    const { addPost } = usePosts();

    const postContent = ref('');

    const compiledMarkdown = computed(() =>
      marked(postContent.value, {
        highlight: function (code) {
          console.log(code);
          return hljs.highlightAuto(code).value;
        },
      }),
    );

    return {
      addPost,
      postContent,
      compiledMarkdown,
    };
  },
});
</script>

<style scoped></style>
