<template>
  <router-link :to="{ name: 'Post', params: { id: id } }">
    <img class="post-trailer__image" :src="image" alt="" />
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostTrailerImage',
  props: {
    image: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import 'src/assets/scss/setup/variables';

.post-trailer__image {
  width: 123px;
  height: 100px;
}

@include respond-to(large) {
  .post-trailer__image {
    width: 200px;
    height: 134px;
  }
}
</style>
