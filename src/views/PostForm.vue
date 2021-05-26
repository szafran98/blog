<template>
  {{ id }}
  <div class="post-form-container" style="background: #3d4f5d">
    <form
      action=""
      class="post-form"
      @submit.prevent="savePost"
      style="display: grid"
    >
      <input
        type="text"
        placeholder="Title"
        v-model="post.title"
        style="width: auto; padding: 10px; border: 1px solid #ddd"
      />

      <Tagify
        :on-change="updateTags"
        :value="post.tags"
        style="background: white"
      />
      <div class="pure-g" style="gap: 1.7%">
        <div class="pure-u-1-2" style="width: 49%">
          <textarea
            name="new-post-input"
            id="new-post-input"
            rows="10"
            v-model="post.content"
            style="
              width: 100%;
              resize: vertical;
              height: 97%;
              border: 1px solid #ddd;
            "
          ></textarea>
        </div>
        <div
          id="compiled-md"
          class="pure-u-1-2"
          v-html="compiledMarkdown"
          style="
            width: 49%;
            background: white;
            overflow: auto;
            border: 1px solid #ddd;
          "
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
import {
  useRouter,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
  useRoute,
} from 'vue-router';
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
  props: {
    id: Number,
  },
  setup(props) {
    const { addPost, editPost, getPost } = usePosts();
    const router = useRouter();
    const route = useRoute();

    console.log(props);

    console.log(router.currentRoute.value.name === 'EditPost');

    let post: any;
    let funcToEvalOnSave: Function;
    const savePost = () => {
      funcToEvalOnSave(post).then(() => router.push({ name: 'Home' }));
    };

    if (router.currentRoute.value.name === 'AddPost') {
      post = reactive({
        title: '',
        tags: [] as string[],
        content: '',
      });
      funcToEvalOnSave = addPost;
    } else if (router.currentRoute.value.name === 'EditPost') {
      console.log(props.id);
      post = reactive({
        ...getPost(props.id as number),
      });
      funcToEvalOnSave = editPost;
      console.log(post);
    }
    /*const post = reactive({
      title: '',
      tags: [] as string[],
      content: '',
    });*/

    const addBlogPost = () => {
      addPost(post).then(() => router.push({ name: 'Home' }));
    };

    //const postContent = ref('');
    //const tags = ref([] as string[]);

    const updateTags = (e: any) => {
      console.log('hehehe');

      const tagsList = JSON.parse(e.target.value);

      const tags = [];
      for (const tag of tagsList) {
        tags.push(tag.value);
      }

      for (const tag of tags) {
        const isTagAlready = (tag: any) => {
          if (!post.tags.find((t: string) => t === tag)) {
            post.tags.push(tag);
          }
        };
        isTagAlready(tag);
      }

      for (const tag of post.tags) {
        if (!tags.find((t) => t === tag)) {
          const deletedTagIndex = post.tags.indexOf(tag);
          post.tags.splice(deletedTagIndex, 1);
        }
      }
    };

    /*const updateTags = (e: any) => {
      const tagsList = JSON.parse(e.target.value);
      for (const tag of tagsList) {
        const isTagAlready = (tag: any) => {
          console.log(Array.from(post.tags));
          console.log(tag.value);
          if (!post.tags.find((t: string) => t === tag.value)) {
            post.tags.push(tag.value);
          }
        };
        isTagAlready(tag);
      }
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
      addBlogPost,
      savePost,
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
