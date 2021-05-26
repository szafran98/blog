<template>
  <div class="post-trailer-container">
    <div class="post-meta">
      <div class="post-author-container">
        <span>By </span>
        <a href="" class="post-author" style="color: rgba(26, 137, 23, 1)">
          {{ postData.author.username }}
        </a>
      </div>
      <h2 class="post-title">
        <router-link :to="{ name: 'Post', params: { id: postData.id } }">
          {{ postData.title }}
        </router-link>
      </h2>
      <h3 class="post-description">
        <router-link :to="{ name: 'Post', params: { id: postData.id } }">
          {{ postData.description }}
        </router-link>
      </h3>
      <div class="post-footer">
        <div class="post-pub-date">
          {{ postDatePub }} &#9642; {{ readingTime() }} min read
        </div>
        <div class="post-footer-buttons">
          <button class="far fa-bookmark"></button>
          <component :is="dropdownButtonElement" />
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'Post', params: { id: postData.id } }">
      <img class="trailer-image" :src="postData.image" alt="" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, h, PropType, reactive } from 'vue';
import PostDropdownMenu from '@/components/post/PostDropdownMenu.vue';
import { PostResponse } from '@/types/types.ts';
import { useTippy } from 'vue-tippy';

export default defineComponent({
  name: 'PostTrailer',
  components: {
    PostDropdownMenu,
  },
  props: {
    postData: {
      type: Object as PropType<PostResponse>,
      required: true,
    },
  },
  setup(props) {
    const showDropdownMenu = ref(false);

    const postDatePub = computed(() => {
      return new Date(
        props.postData.date_pub_timestamp * 1000,
      ).toLocaleDateString('en-EN', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    });

    const readingTime = () => {
      const text: string = props.postData.content;
      const wpm = 225;
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil(words / wpm);
      return time;
    };

    const dropdownButton = ref();
    const dropdownButtonElement = () =>
      h('button', {
        ref: dropdownButton,
        class: 'fas fa-ellipsis-h',
      });

    useTippy(dropdownButton, {
      content: h(PostDropdownMenu),
      allowHTML: true,
      trigger: 'click',
      hideOnClick: true,
      interactive: true,
      touch: true,
      theme: 'custom',
    });

    return {
      showDropdownMenu,
      postDatePub,
      readingTime,
      dropdownButtonElement,
    };
  },
});
</script>

<style scoped lang="scss">
//@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&family=Roboto:wght@300;400;500;700&display=swap');

@media screen and (max-width: 32em) {
  .post-trailer-container {
    justify-content: space-between;
    .post-meta {
      flex: 2 0 0;

      .post-author-container {
        //display: inline-flex;
        //gap: 10px;

        font-size: 13px;
        font-weight: 600;

        span {
          color: #3d4f5d;
        }

        .post-author {
        }
      }

      .post-title {
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        color: black;
        padding-right: 1em;
      }

      .post-description {
        display: none;
      }

      .post-footer {
        font-size: 13px;

        .post-pub-date {
          flex: 8 0 0;
        }

        /*.fa-bookmark {
          flex: 1 0 0;
        }

        .fa-ellipsis-h {
          flex: 1 0 0;
        }*/

        a {
          font-size: 18px;
        }
      }
    }

    .trailer-image {
      //flex: 1 0 0;
      width: 123px;
      height: 100px;
    }
  }
}

.post-trailer-container {
  //font-family: sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 20px;
  //width: 680px;
  //margin: auto;
  margin-bottom: 48px;
  justify-content: space-between;
  display: flex;
  gap: 10px;

  a {
    color: inherit;
  }

  .post-meta {
    .post-author-container {
      vertical-align: super;

      .post-author {
        h4 {
          margin: 0;
          padding: 0;
          //color: rgba(0, 0, 0, 0.8);
          color: rgba(41, 41, 41, 1);
          max-height: 16px;
          font-size: 16px;
          line-height: 16px;
          font-weight: 500;
        }
      }
    }

    .post-title {
    }

    .post-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;

      .post-footer-buttons {
        button {
          border: none;
          background: inherit;
          cursor: pointer;
        }
      }
    }
  }
}

.post-title {
  font-size: 22px;
  margin: 0;
}

.post-description {
  color: rgba(117, 117, 117, 1);
  font-size: 16px;
  font-weight: 400;
  margin: 0;
}

.trailer-image {
  width: 200px;
  height: 134px;
}
</style>
