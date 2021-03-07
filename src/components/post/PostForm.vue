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
        rows="10"
        v-model="postContent"
        style="width: 100%; resize: vertical"
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

export default defineComponent({
  name: 'PostForm',
  components: {
    //Editor,
  },
  setup() {
    const { addPost } = usePosts();

    const postContent = ref('');

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

    watch(postContent, () => {
      const parent = document.getElementById('compiled-md');
    });

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
  //background: #2d2d2d;
  //color: white;
  border: 1px solid black;
}
</style>
