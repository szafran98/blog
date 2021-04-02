<template>
  <div class="post-trailer-container" style="display: flex">
    <div class="post-meta">
      <div
        class="post-author-container"
        style="display: inline-flex; gap: 10px"
      >
        <a href="" class="post-author" style="color: rgba(26, 137, 23, 1)">
          <h4>By {{ postData.author.username }}</h4>
        </a>
      </div>
      <h2 class="post-title">{{ postData.title }}</h2>
      <h3 class="post-description">{{ postData.description }}</h3>
    </div>
    <img class="minified-image" :src="`${postData.image}`" alt="" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PostTrailer',
  props: ['postData'],
  setup(props) {
    const postDatePub = computed(() => {
      return new Date(
        props.postData.date_pub_timestamp * 1000,
      ).toLocaleDateString('pl-PL');
    });

    return {
      postDatePub,
    };
  },
});
</script>

<style scoped lang="scss">
.post-trailer-container {
  font-family: sohne, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 20px;
  width: 680px;
  //margin: auto;
  margin-bottom: 48px;
}

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
  font-size: 22px;
  margin: 0;
}

.post-description {
  color: rgba(117, 117, 117, 1);
  font-size: 16px;
  font-weight: 400;
  margin: 0;
}

.minified-image {
  width: 200px;
  height: 134px;
}
</style>
