<template>
  <div class="author">
    <span>By </span>
    <a href="" class="author__link" style="color: rgba(26, 137, 23, 1)">
      {{ author.username }}
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Author, PostResponse } from '@/types/types';

export default defineComponent({
  name: 'PostTrailerAuthor',
  props: {
    author: {
      type: Object as PropType<Author>,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
@import 'src/assets/scss/setup/variables';

//////////////////////////////////////////////////////////////
/////////////////// Phone Vertical ///////////////////////////
//////////////////////////////////////////////////////////////

@include respond-to(extra-small) {
  .author {
    font-size: 13px;
    font-weight: 600;

    & > span {
      color: #3d4f5d;
    }
  }
}

@include respond-to(large) {
  .author {
    vertical-align: super;
  }
  .author__link {
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

.author {
  vertical-align: super;
}
.author__link {
  margin: 0;
  padding: 0;
  //color: rgba(0, 0, 0, 0.8);
  color: rgba(41, 41, 41, 1);
  max-height: 16px;
  font-size: 16px;
  line-height: 16px;
  font-weight: 500;
}
</style>
