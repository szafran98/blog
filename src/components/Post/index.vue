<template>
  <section :id="'post' + id" class="post">
    <header class="post-header">
      <h2 class="post-title">{{ post.title }}</h2>
      <h4 class="post-description">{{ post.description }}</h4>
      <div class="post-meta" style="display: flex; flex-direction: column">
        <div style="display: flex; flex-direction: column">
          <div class="post-buttons-container">
            <button class="far fa-bookmark icon-button"></button>
            <component
              class="fas fa-ellipsis-h icon-button"
              :is="dropdownButtonElement1"
            />
          </div>
          <a href="" class="post-author" style="color: rgba(26, 137, 23, 1)">
            {{ post.author.username }}
          </a>
          <div
            class="post-pub-date"
            style="
              font-size: 14px;
              line-height: 20px;
              color: rgba(117, 117, 117, 1);
            "
          >
            {{ postDatePub }} &#9642; {{ readingTime() }} min read
          </div>
        </div>
        <img class="post-image" :src="post.image" alt="" />
      </div>
    </header>
    <div
      :id="'post' + id + '-content'"
      class="post-content line-numbers"
      v-html="compiledMarkdown"
    ></div>
    <div class="post-footer">
      <div
        :id="'post' + id + '-categories'"
        class="post-tags"
        style="margin-top: 10px"
      >
        <template v-for="(tag, index) in post.tags" :key="index">
          <router-link
            :to="{ name: 'PostsOnTag', params: { tagName: tag } }"
            :id="'post' + id + 'category' + tag"
            class="post-category"
            >{{ tag }}</router-link
          >
        </template>
      </div>
      <div class="post-footer-buttons">
        <div class="post-reaction">
          <button
            class="far fa-heart icon-button"
            @click="likePost(post.id)"
          ></button>
          <span>{{ post.likes_count }}</span>
          <button class="far fa-comment icon-button"></button>
        </div>
        <div class="additional-actions">
          <div class="post-buttons-container">
            <button class="far fa-bookmark icon-button"></button>
            <component
              class="fas fa-ellipsis-h icon-button"
              :is="dropdownButtonElement2"
            />
          </div>
        </div>
      </div>
      <div class="post-author-additional-info">
        <div class="post-author">
          <div class="avatar">
            <img
              src="https://images89.fotosik.pl/155/415a81444fa48af8.png"
              alt=""
            />
          </div>
          <div>
            <span>WRITTEN BY</span> <br />
            <span class="name">{{ post.author.username }}</span>
          </div>
          <input type="button" class="follow-btn" value="Follow" />
        </div>
        <div class="author-description">
          I'm a Frontend Tech Lead at Lumigo, blogger, open source maintainer,
          creator of Akita and Spectator, Husband, and Father.
        </div>
      </div>
    </div>
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

export default defineComponent({
  name: 'Post',
  props: {
    id: Number,
  },
  async setup(props: any) {
    //setTimeout(() => alert(props.id), 1000);
    //const store = useStore()
    const router = useRouter();
    const route = useRoute();

    const dropdownButton1 = ref();
    const dropdownButtonElement1 = () =>
      h('button', {
        ref: dropdownButton1,
      });

    const dropdownButton2 = ref();
    const dropdownButtonElement2 = () =>
      h('button', {
        ref: dropdownButton2,
      });

    onMounted(() => {
      useTippy(dropdownButton1, {
        content: h(PostDropdownMenu),
        allowHTML: true,
        trigger: 'click',
        hideOnClick: true,
        interactive: true,
        touch: true,
        theme: 'custom',
      });
      useTippy(dropdownButton2, {
        content: h(PostDropdownMenu),
        allowHTML: true,
        trigger: 'click',
        hideOnClick: true,
        interactive: true,
        touch: true,
        theme: 'custom',
      });
      setTimeout(() => Prism.highlightAll());
    });

    console.log(props);

    const { getPostsByTag, deletePost, getPost, likePost } = usePosts();

    //let post: PostResponse;

    /*onBeforeMount(async () => {
      post = reactive({
        ...(await getPost(props.id)),
      }) as PostResponse;
    });*/

    const post = reactive({
      ...(await getPost(props.id)),
    }) as PostResponse;

    /*const post = reactive({
      id: 1,
      title: 'elo',
      description: 'elo',
      content: 'elo',
      image: 'elo',
      // eslint-disable-next-line @typescript-eslint/camelcase
      date_pub_timestamp: 10,
      author: { username: 'elo' },
    });*/

    //console.log(post);

    const redirectToEditForm = (postId: number) => {
      console.log(typeof postId);
      router.push({ name: 'EditPost', params: { id: postId } });
    };

    const isLogged = inject('isLogged');

    //const id = computed(() => props.id);
    const postDatePub = computed(() => {
      return new Date(post.date_pub_timestamp * 1000).toLocaleDateString(
        'pl-PL',
        {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
        },
      );
    });

    const setCodeSampleClass = () => {
      const parent = document.getElementById(`post${post.id}-content`);
      console.log(
        Array.from(parent!.children).find((el) => el.tagName === 'PRE'),
      );
      try {
        const preElement = Array.from(parent!.children).find(
          (el) => el.tagName === 'PRE',
        );
        if (preElement!.tagName === 'PRE') {
          console.log(preElement);
          preElement!.classList.add('hljs');
        }
      } catch (e) {
        console.log(e);
      }
    };

    //setTimeout(() => setCodeSampleClass());

    const compiledMarkdown = computed(() => {
      //console.log(marked(props.postData.content));
      return marked(
        post.content /*{
        highlight: function (code, lang) {
          return hljs.highlight('typescript', code).value;
        },
      }*/,
      );
    });

    //Prism.highlightElement(document.getElementById(`post${post.id`));

    /*const generateAndAppendRandomTagColors = () => {
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
    };*/

    //setTimeout(() => generateAndAppendRandomTagColors(), 1000);

    const readingTime = () => {
      const text: string = post.content;
      const wpm = 225;
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil(words / wpm);
      return time;
    };

    //setTimeout(() => console.log(dropdownButtonek.value), 100);

    return {
      isLogged,
      post,
      //id,
      postDatePub,
      compiledMarkdown,
      getPostsByTag,
      deletePost,
      likePost,
      redirectToEditForm,
      readingTime,
      dropdownButtonElement1,
      dropdownButtonElement2,
    };
  },
});
</script>

<style lang="scss">
.icon-button {
  border: none;
  background: transparent;
  cursor: pointer;
}

@media screen and (max-width: 32em) {
  .post {
    margin-top: 4em;
    margin-left: 1.5em;
    margin-right: 1.5em;

    .post-header {
      .post-title {
        font-size: 34px;
        font-family: 'Lora', serif;
        font-weight: 500;
        color: black;
        //padding-right: 1em;
        margin-block-end: 0.2em;
      }

      .post-description {
        color: rgba(117, 117, 117, 1);
        font-size: 18px;
        font-weight: 400;
        line-height: 24px;
        margin-block-start: 0;
        //margin: 0;
      }

      .post-buttons-container {
        margin-bottom: 1em;
        button {
          border: none;
          background: inherit;
          cursor: pointer;
        }
      }

      .post-meta {
        .post-image {
          width: 100%;
          height: auto;
          margin-top: 2em;
        }
      }
    }

    .post-content {
      font-size: 18px;
      line-height: 28px;
      font-family: charter, Georgia, Cambria, 'Times New Roman', Times, serif;
      margin-top: 2em;

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        font-family: 'Roboto', sans-serif;
      }

      img {
        width: 100%;
      }
    }

    .post-footer {
      .post-author-additional-info {
        .post-author {
          margin-top: 1em;
          display: flex;
          column-gap: 20px;
          align-items: center;

          .avatar > img {
            width: 50px;
            border-radius: 90px;
          }
        }

        .author-description {
          margin-left: 5em;
          margin-right: 2em;
          font-size: 14px;
          color: rgba(117, 117, 117, 1);
          line-height: 20px;
        }
      }
    }
  }
}

.post {
  margin-left: 1.5em;
  margin-right: 1.5em;

  .post-header {
    .post-title {
      font-size: 34px;
      font-family: 'Lora', serif;
      font-weight: 500;
      color: black;
      //padding-right: 1em;
      margin-block-end: 0.2em;
    }

    .post-description {
      color: rgba(117, 117, 117, 1);
      font-size: 18px;
      font-weight: 400;
      line-height: 24px;
      margin-block-start: 0;
      //margin: 0;
    }

    .post-buttons-container {
      button {
        border: none;
        background: inherit;
        cursor: pointer;
      }
    }

    .post-meta {
      .post-image {
        width: 100%;
        height: auto;
        margin-top: 2em;
      }
    }
  }

  .post-content {
    font-size: 18px;
    line-height: 28px;
    font-family: charter, Georgia, Cambria, 'Times New Roman', Times, serif;
    margin-top: 2em;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Roboto', sans-serif;
    }

    img {
      width: 100%;
    }
  }

  .post-footer {
    .post-tags {
      display: flex;
      flex-wrap: wrap;
      .post-category {
        display: block;
        background: rgba(242, 242, 242, 1);
        color: rgba(117, 117, 117, 1);
        font-size: 13px;
        padding: 5px 10px;
        margin: 5px;
        border-radius: 3px;
        text-decoration: none;
      }
    }

    .post-footer-buttons {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      margin-top: 2em;
    }

    .post-author-additional-info {
      margin-top: 1em;
      border-top: 1px solid #eee;

      .post-author {
        margin-top: 1em;
        display: flex;
        column-gap: 20px;
        align-items: center;
        color: rgba(117, 117, 117, 1);
        font-size: 12px;
        letter-spacing: 1px;

        .avatar > img {
          width: 50px;
          border-radius: 90px;
        }

        .name {
          font-family: 'Roboto', sans-serif;
          font-size: 20px;
          font-weight: 600;
          color: black;
          letter-spacing: 0;
        }

        .follow-btn {
          border: none;
          border-radius: 45px;
          padding-left: 10px;
          padding-right: 10px;
          padding-top: 7px;
          padding-bottom: 7px;
          color: white;
          background: #2d98f5;
          letter-spacing: 1px;
        }
      }
    }
  }
}

/*.post {
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
}*/
</style>
