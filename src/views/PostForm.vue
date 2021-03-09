<template>
  <div class="post-form-container" style="background: #3d4f5d">
    <form
      action=""
      class="post-form"
      @submit.prevent="addPost(post)"
      style="display: grid"
    >
      <input
        type="text"
        placeholder="Title"
        v-model="post.title"
        style="width: auto; padding: 10px; border: 1px solid #ddd"
      />

      <Tagify :on-change="updateTags" style="background: white" />
      <div class="pure-g" style="gap: 1.7%">
        <div class="pure-u-1-2" style="width: 49%">
          <textarea
            name="new-post-input"
            id="new-post-input"
            rows="10"
            v-model="post.content"
            style="width: 100%; resize: vertical; height: 97%"
          ></textarea>
        </div>
        <div
          id="compiled-md"
          class="pure-u-1-2"
          v-html="compiledMarkdown"
          style="width: 49%; background: white; overflow: auto"
        ></div>
      </div>
      <button
        type="submit"
        class="pure-button pure-button-primary button-large"
        style="width: auto"
      >
        Add post
      </button>
    </form>
    {{ post }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, reactive } from 'vue';
import { usePosts } from '@/composable/usePosts';
import marked from 'marked';
import * as Prism from 'prismjs';
/*
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-typescript';
import 'prismjs/themes/prism-tomorrow.css';*/
import Editor from '@tinymce/tinymce-vue';
import highlight from 'highlight.js';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css';
import 'highlight.js/lib/languages/typescript';
import 'highlight.js/lib/languages/javascript';

import Tagify from '@yaireo/tagify/dist/tagify.vue';
import '@yaireo/tagify/dist/tagify.css';

export default defineComponent({
  name: 'PostForm',
  components: {
    //Editor,
    Tagify,
  },
  setup() {
    const { addPost } = usePosts();

    const post = reactive({
      title: '',
      tags: [] as string[],
      content: '',
    });

    //const postContent = ref('');
    //const tags = ref([] as string[]);

    const updateTags = (e: any) => {
      const tagsList = JSON.parse(e.target.value);
      for (const tag of tagsList) {
        const isTagAlready = (tag: any) => {
          console.log(Array.from(post.tags));
          console.log(tag.value);
          if (!post.tags.find((t) => t === tag.value)) {
            post.tags.push(tag.value);
          }
        };
        isTagAlready(tag);
      }
      //console.log(tags.value);
    };

    /*const addPostPrismFix = (content: string) => {
      addPost(content).then(() => {
        return;
      });
    };*/

    const debounce = (func: (arg0: any) => void, wait: number | undefined) => {
      let timeout: number | undefined;

      return function executedFunction(...args: any[]) {
        const later = () => {
          clearTimeout(timeout);
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          //@ts-ignore
          func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    };

    const setCodeSampleClass = () => {
      const parent = document.getElementById('compiled-md');
      try {
        const preElement = parent!.firstElementChild;
        const children = parent!.children;
        for (const child of children) {
          //console.log(child);
          if (child.tagName === 'PRE') {
            child.classList.add('hljs');
            child.classList.add('language-typescript');
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    const compiledMarkdown = computed(() =>
      marked(
        post.content,
        {
          highlight: () => {
            setTimeout(() => setCodeSampleClass(), 3000);
          },
        } /*{
        highlight: function (code) {
          console.log(code);
          setTimeout(() => setCodeSampleClass(), 3000);
          return hljs.highlightAuto(code).value;
        },
      }*/,
      ),
    );

    return {
      updateTags,
      addPost,
      //addPostPrismFix,
      post,
      //postContent,
      //tags,
      compiledMarkdown,
    };
  },
});
</script>

<style lang="scss">
.post-form-container {
  padding: 10px;

  .post-form > * {
    margin: 5px;
  }
}
.tagify {
  background: white;
}

#compiled-md {
  //background: #2d2d2d;
  //color: white;
  border: 1px solid black;
}
</style>
