<template>
  <h3 class="description">
    <router-link :to="{ name: 'Post', params: { id: id } }">
      {{ description }}
    </router-link>
  </h3>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostTrailerDescription',
  props: {
    description: {
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

.description {
  display: none;
  color: rgba(117, 117, 117, 1);
  margin: 0;
}

@include respond-to(large) {
  .description {
    //color: rgba(117, 117, 117, 1);
    font-size: 16px;
    font-weight: 400;
    margin: 0;
  }
}
</style>
