<template>
  <div class="tags" v-cloak>
    <h4 class="tags__header">Popular tags</h4>
    <div id="popular-tags-list" class="tags__list list">
      <router-link
        to=""
        v-for="(tag, index) in tenMostPopularTags"
        :key="index"
        class="post-category list__element"
        >{{ tag }}</router-link
      >
    </div>
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
[v-cloak] {
  display: none;
}

.tags {
  display: flex;
  flex-direction: column;
  flex: 1 0 0;

  background-color: rgb(250, 250, 250);
  padding: 1.5em;
  margin-bottom: 2em;

  height: fit-content;
  //min-width: 50px;
  //max-width: 20em;
}

.tags__list {
}

.list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 10px;
  grid-row-gap: 10px;
}

.list__element {
  @include post-tag;
  flex: 1 0 auto;
  margin: 0 0.1em;
  //padding: 0.3em 1em;
  //color: #fff;
  //background: #999;
  //font-size: 80%;
  position: relative;
  height: fit-content;
  text-align: center;

  &:hover {
    box-shadow: 2px 2px 2px 2px #ccc;
  }
}

@include respond-to(medium) {
  .tags {
    //width: 100%;
  }
}

@include respond-to(large) {
  .tags {
    min-width: 50px;
    max-width: 20em;
  }
}

/*@media screen and (max-width: 72em) {
  #popular-tags {
    margin-top: 1em;
  }
}

#popular-tags {
  background-color: rgb(250, 250, 250);
  padding: 1.5em;

  height: fit-content;
  min-width: 50px;
  display: flex;
  flex: 1 0 0;
  margin-left: 100px;
  max-width: 20em;
  top: 75px;
  position: sticky;

  #popular-tags-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    column-gap: 10px;
    grid-row-gap: 10px;

    .post-category {
      flex: 1 0 auto;
      margin: 0 0.1em;
      padding: 0.3em 1em;
      color: #fff;
      background: #999;
      font-size: 80%;
      position: relative;
      height: fit-content;
      text-align: center;
    }
  }
}*/
</style>
