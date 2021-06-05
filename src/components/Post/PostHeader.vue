<template>
  <div id="post-top" class="header">
    <h2 class="header__title">{{ post.title }}</h2>
    <h4 class="header__description">{{ post.description }}</h4>
    <div class="meta">
      <div class="meta__body">
        <a href="" class="meta__author">
          <img
            class="meta__avatar"
            src="https://images89.fotosik.pl/155/415a81444fa48af8.png"
            alt=""
          />
          <div>{{ post.author.username }}</div>
        </a>
        <div class="meta__pub-date">
          {{ postDatePub }} &#9642; {{ readingTime }} min read
        </div>
        <div class="meta__buttons">
          <button class="far fa-bookmark meta__button"></button>
          <component
            class="fas fa-ellipsis-h meta__button"
            :is="dropdownButtonElement"
          />
        </div>
      </div>
      <img id="post-image" class="meta__image" :src="post.image" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, h, onMounted, PropType, ref } from 'vue';
import { PostResponse } from '@/types/types';
import {
  calculatePostReadingTime,
  getFormattedPostDate,
} from '@/common/mixins/PostMixin';
import { useTippy } from 'vue-tippy';
import PostDropdownMenu from '@/components/Post/PostDropdownMenu.vue';
import { useStore } from '@/store';
import { MutationTypes } from '@/store/mutation-types';

export default defineComponent({
  name: 'PostHeader',
  props: {
    post: {
      type: Object as PropType<PostResponse>,
      required: true,
    },
  },
  emits: ['postTopRef'],
  setup(props, { emit }) {
    const store = useStore();

    const isLoggedIn = computed(() => store.getters.isLoggedIn);

    const readingTime = computed(() =>
      calculatePostReadingTime(props.post.content),
    );

    const postDatePub = computed(() =>
      getFormattedPostDate(props.post.date_pub_timestamp),
    );

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
      isLoggedIn,
      readingTime,
      postDatePub,
      dropdownButtonElement,
    };
  },
});
</script>

<style scoped lang="scss">
// DEFAULT, PHONE
.header {
}
.header__title {
  font-size: 34px;
  font-family: 'Lora', serif;
  font-weight: 500;
  color: black;
  margin-block-end: 0.2em;
}
.header__description {
  color: rgba(117, 117, 117, 1);
  font-size: 18px;
  font-weight: 400;
  line-height: 24px;
  margin-block-start: 0;
}

.meta {
  display: flex;
  flex-direction: column;
}

.meta__buttons {
  margin-left: auto;
}

.meta__button {
  @include icon-button;
}

.meta__body {
  display: flex;
  align-items: center;
  gap: 10px;
}

.meta__author {
  display: flex;
  align-items: center;
  color: rgba(26, 137, 23, 1);

  div:last-child {
    margin-left: 10px;
  }
}

.meta__avatar {
  @include author-avatar;
  width: 30px;
}

.meta__pub-date {
  font-size: 14px;
  line-height: 20px;
  color: rgba(117, 117, 117, 1);
}

.meta__image {
  width: 100%;
  height: auto;
  margin-top: 2em;
}
</style>
