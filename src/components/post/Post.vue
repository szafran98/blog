<template>
  <section :id="'post' + id" class="post">
    <header class="post-header">
      <h2 class="post-title">{{ postData.title }}</h2>
      <div class="post-meta" style="display: grid">
        <div style="display: inline-flex; gap: 10px">
          <a href="" class="post-author" style="color: rgba(26, 137, 23, 1)">
            {{ postData.author.username }}
          </a>
          <div>{{ postDatePub }} | {{ postData.likes_count }}</div>
        </div>
        <div :id="'post' + id + '-categories'" style="margin-top: 10px">
          <template v-for="(tag, index) in postData.tags" :key="index">
            <router-link
              :to="{ name: 'PostsOnTag', params: { tagName: tag } }"
              :id="'post' + id + 'category' + tag"
              class="post-category"
              >{{ tag }}</router-link
            >
          </template>
        </div>
      </div>
    </header>
    <div
      :id="'post' + id + '-content'"
      class="post-content line-numbers"
      v-html="compiledMarkdown"
    ></div>
    <div
      class="post-footer post-meta pure-g"
      v-if="isLogged"
      style="gap: 20px; justify-content: flex-end"
    >
      <!--<span>{{ postDatePub }}</span>
      <span> | {{ postData.likes_count }}</span>-->
      <input
        type="button"
        class="pure-u-1-8 pure-button pure-button-primary"
        @click="deletePost(postData.id)"
        value="Delete"
      />
      <input
        type="button"
        class="pure-u-1-8 pure-button pure-button-primary"
        @click="redirectToEditForm(postData.id)"
        value="Edit"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import { usePosts } from '@/composable/usePosts';
import { app } from '@/main';
import marked from 'marked';
//import '@/assets/prism.css';

import highlight from 'highlight.js';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/monokai.css';
import 'highlight.js/lib/languages/typescript';

//import * as Prism from 'prismjs';

export default defineComponent({
  name: 'Post',
  props: ['postData'],
  setup(props: any) {
    //const store = useStore()
    const router = useRouter();

    const { getPostsByTag, deletePost } = usePosts();

    const redirectToEditForm = (postId: number) => {
      console.log(typeof postId);
      router.push({ name: 'EditPost', params: { id: postId } });
    };

    const isLogged = inject('isLogged');

    const id = computed(() => props.postData.id);
    const postDatePub = computed(() => {
      return new Date(
        props.postData.date_pub_timestamp * 1000,
      ).toLocaleDateString('pl-PL');
    });

    const setCodeSampleClass = () => {
      const parent = document.getElementById(`post${id.value}-content`);
      //console.log(parent);
      try {
        const preElement = parent!.firstElementChild;
        if (preElement!.tagName === 'PRE') {
          preElement!.classList.add('hljs');
        }
      } catch (e) {
        console.log(e);
      }
    };

    const compiledMarkdown = computed(() => {
      console.log(marked(props.postData.content));
      return marked(props.postData.content);
    });

    //Prism.highlightElement(document.getElementById(`post${id.value}`)!);

    const generateAndAppendRandomTagColors = () => {
      const colorCodes = '0123456789AB';

      const tagElements = document.getElementById(`post${id.value}-categories`)!
        .children;

      for (const tagElement of tagElements as HTMLCollectionOf<HTMLElement>) {
        let color = '#';

        for (let i = 0; i < 6; i++) {
          color += colorCodes[Math.floor(Math.random() * 12)];
        }

        tagElement.style.background = color;
      }
    };

    setTimeout(() => generateAndAppendRandomTagColors(), 1000);

    return {
      isLogged,
      id,
      postDatePub,
      compiledMarkdown,
      getPostsByTag,
      deletePost,
      redirectToEditForm,
    };
  },
});
</script>

<style lang="scss">
.post {
  //border: 1px solid black;
  width: auto;
  margin: auto;
  padding-bottom: 2em;
  margin-bottom: 20px;

  .post-title {
    //font-size: 2em;
    color: #222;
    margin-bottom: 0.2em;
    font-family: sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: 46px;
  }

  .post-content {
    //font-family: Georgia, 'Cambria', serif;
    color: #444;
    line-height: 1.8em;
    text-align: left;
    //line-height: 32px;
    letter-spacing: 0;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif;
      border-bottom: 1px solid #eaecef;
      margin-bottom: -0.28em;
    }

    @media (min-width: 48em) {
      p {
        font-family: charter, Georgia, Cambria, 'Times New Roman', Times, serif;
        font-size: 21px;
      }
    }
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
