<template>
  <router-link
    class="tag"
    :to="{ name: 'PostsOnTag', params: { tagName: tag } }"
  >
    <slot></slot>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppTag',
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.tag {
  @include post-tag;
}
</style>
