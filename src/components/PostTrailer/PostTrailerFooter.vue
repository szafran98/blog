<template>
  <div class="footer">
    <div class="footer__reading-time">
      {{ postDatePub }} &#9642; {{ readingTime }} min read
    </div>
    <div class="footer__buttons" v-if="isLogged">
      <button
        class="far fa-bookmark"
        @click="addToReadingList(postData.id)"
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

export default defineComponent({
  name: 'PostTrailerFooter',
  props: {
    postData: {
      type: Object as PropType<PostResponse>,
      required: true,
    },
  },
  setup(props) {
    const { addToReadingList } = usePosts();

    const isLogged = inject('isLogged');

    const readingTime = computed(() => {
      const text: string = props.postData.content;
      const wpm = 225;
      const words = text.trim().split(/\s+/).length;
      const time = Math.ceil(words / wpm);
      return time;
    });

    const postDatePub = computed(() => {
      return new Date(
        props.postData.date_pub_timestamp * 1000,
      ).toLocaleDateString('en-EN', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });
    });

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

@include respond-to(extra-small) {
  .footer {
    font-size: 13px;
  }
  .footer__reading-time {
    flex: 8 0 0;
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

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
}
.footer__reading-time {
}
.footer__buttons {
  & > button {
    border: none;
    background: inherit;
    cursor: pointer;
  }
}
</style>
