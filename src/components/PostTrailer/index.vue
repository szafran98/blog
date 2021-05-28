<template>
  <div class="post-trailer">
    <div class="post-trailer__meta">
      <PostTrailerAuthor :author="postData.author" />
      <PostTrailerTitle :title="postData.title" :id="postData.id" />
      <PostTrailerDescription
        :description="postData.description"
        :id="postData.id"
      />
      <PostTrailerFooter :postData="postData" />
    </div>
    <PostTrailerImage :image="postData.image" :id="postData.id" />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  h,
  PropType,
  reactive,
  inject,
} from 'vue';
import PostDropdownMenu from '@/components/Post/PostDropdownMenu.vue';
import { PostResponse } from '@/types/types.ts';
import { useTippy } from 'vue-tippy';
import { usePosts } from '@/composable/usePosts';
import PostTrailerAuthor from '@/components/PostTrailer/PostTrailerAuthor.vue';
import PostTrailerTitle from '@/components/PostTrailer/PostTrailerTitle.vue';
import PostTrailerDescription from '@/components/PostTrailer/PostTrailerDescription.vue';
import PostTrailerFooter from '@/components/PostTrailer/PostTrailerFooter.vue';
import PostTrailerImage from '@/components/PostTrailer/PostTrailerImage.vue';

export default defineComponent({
  name: 'PostTrailer',
  components: {
    PostTrailerImage,
    PostTrailerFooter,
    PostTrailerDescription,
    PostTrailerTitle,
    PostTrailerAuthor,
  },
  props: {
    postData: {
      type: Object as PropType<PostResponse>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
@import 'src/assets/scss/setup/mixins';
@import 'src/assets/scss/setup/variables';

//////////////////////////////////////////////////////////////
/////////////////// Phone Vertical ///////////////////////////
//////////////////////////////////////////////////////////////

@include respond-to(extra-small) {
  .post-trailer {
    justify-content: space-between;
  }
  .post-trailer__meta {
    flex: 2 0 0;
  }
}

//////////////////////////////////////////////////////////////
/////////////////// Full HD /////////////////////////////////
//////////////////////////////////////////////////////////////

@include respond-to(large) {
  .post-trailer {
  }

  .post-trailer__meta {
    //width: 100%;
  }
}

//////////////////////////////////////////////////////////////
/////////////////// All queries //////////////////////////////
//////////////////////////////////////////////////////////////

.post-trailer {
  @include inherited-a-tag;

  line-height: 20px;
  margin-bottom: 48px;
  justify-content: space-between;
  display: flex;
  gap: 10px;
}

.post-trailer__meta {
  width: 100%;
}

/*@media screen and (max-width: 32em) {
  .post-trailer-container {
    justify-content: space-between;
    .post-meta {
      flex: 2 0 0;

      /deep/ .post-author-container {
        //display: inline-flex;
        //gap: 10px;

        font-size: 13px;
        font-weight: 600;

        span {
          color: #3d4f5d;
        }

        .post-author {
        }
      }

      .post-title {
        font-size: 16px;
        font-family: 'Roboto', sans-serif;
        font-weight: 600;
        color: black;
        padding-right: 1em;
      }

      .post-description {
        display: none;
      }

      .post-footer {
        font-size: 13px;

        .post-pub-date {
          flex: 8 0 0;
        }

        a {
          font-size: 18px;
        }
      }
    }

    .trailer-image {
      //flex: 1 0 0;
      width: 123px;
      height: 100px;
    }
  }
}

.post-trailer-container {
  @include inherited-a-tag;

  line-height: 20px;
  margin-bottom: 48px;
  justify-content: space-between;
  display: flex;
  gap: 10px;

  .post-meta {
    ::v-deep(.post-author-container) {
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

    ::v-deep(.post-title) {
      font-size: 22px;
      margin: 0;
    }

    ::v-deep(.post-description) {
      color: rgba(117, 117, 117, 1);
      font-size: 16px;
      font-weight: 400;
      margin: 0;
    }

    ::v-deep(.post-footer) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-family: 'Roboto', sans-serif;
      font-weight: 400;

      .post-footer-buttons {
        button {
          border: none;
          background: inherit;
          cursor: pointer;
        }
      }
    }
  }
}*/
</style>
