<template>
  <div id="popular-tags">
    <router-link
      to=""
      v-for="(tag, index) in tenMostPopularTags"
      :key="index"
      class="post-category"
      >{{ tag }}</router-link
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { usePosts } from '@/composable/usePosts';

export default defineComponent({
  name: 'PopularTags',
  async setup() {
    const { getMostPopularTags } = usePosts();

    const orderedTags = await getMostPopularTags();

    const tenMostPopularTags = computed(() => {
      const tags = [];
      for (const tag in orderedTags) {
        if (tags.length < 10) {
          tags.push(tag);
        }
      }
      return tags;
    });

    return {
      orderedTags,
      tenMostPopularTags,
    };
  },
});
</script>

<style scoped lang="scss">
#popular-tags {
  background-color: rgb(250, 250, 250);
  padding: 20px;
  //margin-top: 30px;
  margin: 50px;
  position: sticky;
  height: fit-content;
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 10px;
  grid-row-gap: 10px;
  top: 20px;

  .post-category {
    margin: 0 0.1em;
    padding: 0.3em 1em;
    color: #fff;
    background: #999;
    font-size: 80%;
    position: relative;
    height: fit-content;
  }
}
</style>
