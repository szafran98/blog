<template>
  <div class="post-form-container">
    <form
      action=""
      class="post-form"
      @submit.prevent="addPostPrismFix(postContent)"
      style="display: grid"
    >
      <Tagify :on-change="updateTags" />
      <input
        type="text"
        placeholder="Title"
        style="width: 45%; padding: 10px; margin: 5px"
      />
      <!--<input
        type="text"
        placeholder="Tags"
        style="width: 45%; padding: 10px; margin: 5px"
      />-->
      <div class="pure-g" style="gap: 1%">
        <div class="pure-u-1-2" style="width: 49%">
          <textarea
            name="new-post-input"
            id="new-post-input"
            rows="10"
            v-model="postContent"
            style="width: 100%; resize: vertical; height: 97%"
          ></textarea>
        </div>
        <div
          id="compiled-md"
          class="pure-u-1-2"
          v-html="compiledMarkdown"
          style="width: 49%"
        ></div>
      </div>
      <button
        type="submit"
        class="pure-button pure-button-primary button-large"
      >
        Add post
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
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

    const postContent = ref('');
    const tags = ref([] as string[]);

    const updateTags = (e: any) => {
      const tagsList = JSON.parse(e.target.value);
      for (const tag of tagsList) {
        const isTagAlready = (tag: any) => {
          console.log(Array.from(tags.value));
          console.log(tag.value);
          if (!tags.value.find((t) => t === tag.value)) {
            tags.value.push(tag.value);
          }
        };
        isTagAlready(tag);
      }
      console.log(tags.value);
    };

    const addPostPrismFix = (content: string) => {
      addPost(content).then(() => {
        return;
      });
    };

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
        postContent.value,
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

    watch(tags, () => {
      //const tagsList = tags.value.split(',');
      //console.log(tagsList);
      //const tagList = tags.value.spl
    });

    return {
      updateTags,
      addPost,
      addPostPrismFix,
      postContent,
      tags,
      compiledMarkdown,
    };
  },
});
</script>

<style scoped lang="scss">
#compiled-md {
  //background: #2d2d2d;
  //color: white;
  border: 1px solid black;
}
</style>
