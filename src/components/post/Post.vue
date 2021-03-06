<template>
  <section class="post">
    <header class="post-header">
      <p class="post-meta">
        By
        <a href="" class="post-author">
          {{ postData.author.username }}
        </a>
        under
        <a href="" class="post-category post-category-design">CSS</a>
        <a href="" class="post-category post-category-pure">HTML</a>
      </p>
    </header>
    <div class="post-content line-numbers" v-html="compiledMarkdown"></div>
    <div class="post-footer post-meta">
      {{ postDatePub }} |
      {{ postData.likes_count }}
      <input type="button" @click="deletePost(postData.id)" value="Delete" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import { usePosts } from '@/composable/usePosts';
import { app } from '@/main';
import marked from 'marked';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/monokai.css';
import '@/assets/prism.css';

import highlight from 'highlight.js';

export default defineComponent({
  name: 'Post',
  props: ['postData'],
  setup(props: any) {
    //const store = useStore()

    const { deletePost } = usePosts();

    const postDatePub = computed(() => {
      return new Date(props.postData.date_pub_timestamp * 1000).toDateString();
    });

    const compiledMarkdown = computed(() =>
      marked(
        props.postData
          .content /*{
        highlight: function (code) {
          console.log(code);
          return hljs.highlightAuto(code).value;
        },
      }*/,
      ),
    );

    return {
      postDatePub,
      compiledMarkdown,
      deletePost,
    };
  },
});
</script>

<style scoped lang="scss">
.post {
  //border: 1px solid black;
  width: auto;
  margin: auto;
  padding-bottom: 2em;
  margin-bottom: 20px;

  .post-content {
    font-family: Georgia, 'Cambria', serif;
    color: #444;
    line-height: 1.8em;
    text-align: left;
  }

  .post-meta {
    color: #999;
    //font-size: 90%;
    margin: 0;
    text-align: left;

    a {
      text-decoration: none;
      color: rgb(61, 146, 201);
    }

    .post-category-design {
      background: #5aba59;
    }

    .post-category {
      margin: 0 0.1em;
      padding: 0.3em 1em;
      color: #fff;
      background: #999;
      font-size: 80%;
    }

    .post-category-pure {
      background: #4d85d1;
    }
  }
}
</style>
