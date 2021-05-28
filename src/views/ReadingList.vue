<template>
  <div class="reading-list-container">
    <h1>Reading List</h1>
    <div class="reading-list" v-for="post in posts" :key="post.id">
      <PostTrailer :postData="post" />
      <div style="margin-bottom: 1em">
        <span
          ><button
            class="far fa-trash-alt icon-button"
            @click="removeFromReadingList(post.id)"
          ></button>
          Remove</span
        >
        &#9642;
        <span><button class="far fa-folder icon-button"></button> Archive</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { useStore } from '../store';
import { usePosts } from '@/composable/usePosts';

import PostTrailer from '@/components/PostTrailer/index.vue';

export default defineComponent({
  name: 'ReadingList',
  components: {
    PostTrailer,
  },
  async setup() {
    const { getUserReadingList, removeFromReadingList } = usePosts();

    const posts = await getUserReadingList();

    return {
      posts,
      removeFromReadingList,
    };
  },
});
</script>

<style scoped lang="scss">
.reading-list-container {
  max-width: 680px;
  border-bottom: 1px solid #eee;

  .reading-list {
    span {
      cursor: pointer;
    }
  }
  .post-trailer-container {
    margin: 0;

    .trailer-image {
      //width: 80px;
      //height: 80px;
      //margin-top: 20px;
    }
  }
}
</style>
