<template>
  <h2 class="title">
    <router-link :to="{ name: 'Post', params: { id: id } }">
      {{ title }}
    </router-link>
  </h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostTrailerTitle',
  props: {
    title: {
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

@include respond-to(extra-small) {
  .title {
    //font-size: 16px;
    //font-family: 'Roboto', sans-serif;
    //font-weight: 600;
    //color: black;
    //padding-right: 1em;
  }
}

@include respond-to(large) {
  .title {
    font-size: 22px;
    margin: 0;
  }
}

.title {
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  color: black;
  padding-right: 1em;
}
</style>
