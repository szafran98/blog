<template>
  <div class="footer">
    <div class="footer__reading-time">
      {{ postDatePub }} &#9642; {{ readingTime }} min read
    </div>
    <div class="footer__buttons" v-if="isLogged">
      <button
        class="far fa-bookmark"
        @click="addToReadingList(post.id)"
      ></button>
      <component :is="dropdownButtonElement" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, h, inject, PropType, ref } from 'vue';
import { PostResponse } from '@/types/types';
import { usePosts } from '@/composable/usePosts';
import { useTippy } from 'vue-tippy';
import PostDropdownMenu from '@/components/Post/PostDropdownMenu.vue';
import {
  calculatePostReadingTime,
  getFormattedPostDate,
} from '@/common/mixins/PostMixin';

export default defineComponent({
  name: 'PostTrailerFooter',
  props: {
    post: {
      type: Object as PropType<PostResponse>,
      required: true,
    },
  },
  setup(props) {
    const { addToReadingList } = usePosts();

    const isLogged = inject('isLogged');

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
      readingTime,
      postDatePub,
      isLogged,
      addToReadingList,
      dropdownButtonElement,
    };
  },
});
</script>

<style scoped lang="scss">
@import 'src/assets/scss/setup/variables';

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 13px;
}
.footer__reading-time {
  flex: 8 0 0;
}

.footer__buttons {
  & > button {
    border: none;
    background: inherit;
    cursor: pointer;
  }
}

@include respond-to(large) {
  .footer {
  }
  .footer__reading-time {
  }
  .footer__buttons {
    & > button {
    }
  }
}
</style>
