<template>
  <div id="post-bottom" class="footer">
    <div class="tags-list" style="margin-top: 10px">
      <template v-for="(tag, index) in post.tags" :key="index">
        <!--        <router-link-->
        <!--          :to="{ name: 'PostsOnTag', params: { tagName: tag } }"-->
        <!--          :id="'post' + id + 'category' + tag"-->
        <!--          class="tags-list__link post-category"-->
        <!--          >{{ tag }}</router-link>-->
        <AppTag :tag="tag">
          {{ tag }}
        </AppTag>
      </template>
    </div>
    <div class="footer__buttons">
      <div class="footer__buttons--left">
        <button
          class="far fa-heart footer__button"
          @click="likePost(post.id)"
        ></button>
        <span>{{ post.likes_count }}</span>
        <button class="far fa-comment footer__button"></button>
      </div>
      <div class="footer__buttons--right">
        <div class="post-buttons-container">
          <button class="far fa-bookmark footer__button"></button>
          <component
            class="fas fa-ellipsis-h footer__button"
            :is="dropdownButtonElement"
          />
        </div>
      </div>
    </div>
    <div class="author">
      <div class="author__body">
        <img
          class="author__avatar"
          src="https://images89.fotosik.pl/155/415a81444fa48af8.png"
          alt=""
        />
        <div class="author__signature">
          <span>WRITTEN BY</span> <br />
          <span class="name">{{ post.author.username }}</span>
        </div>
        <input type="button" class="author__button" value="Follow" />
      </div>
      <div class="author__description">
        I'm a Frontend Tech Lead at Lumigo, blogger, open source maintainer,
        creator of Akita and Spectator, Husband, and Father.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, PropType, ref, onMounted } from 'vue';
import { PostResponse } from '@/types/types';
import { useTippy } from 'vue-tippy';
import PostDropdownMenu from '@/components/Post/PostDropdownMenu.vue';
import AppTag from '@/components/AppTag.vue';
import { usePosts } from '@/composable/usePosts';
import { useStore } from '@/store';
import { MutationTypes } from '@/store/mutation-types';

export default defineComponent({
  name: 'PostFooter',
  components: {
    AppTag,
  },
  props: {
    post: {
      type: Object as PropType<PostResponse>,
      required: true,
    },
  },
  emits: ['postBottomRef'],
  setup(props, { emit }) {
    const { likePost } = usePosts();
    const store = useStore();

    const dropdownButton = ref();
    const dropdownButtonElement = () =>
      h('button', {
        ref: dropdownButton,
      });

    useTippy(dropdownButton, {
      content: h(PostDropdownMenu),
      allowHTML: true,
      trigger: 'click',
      hideOnClick: true,
      interactive: true,
      touch: true,
      theme: 'custom',
    });

    return {
      dropdownButtonElement,
      likePost,
    };
  },
});
</script>

<style scoped lang="scss">
// DEFAULT, PHONE
.footer {
}
.footer__buttons {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  margin-top: 2em;
}
.footer__buttons--left {
}
.footer__buttons--right {
}
.footer__button {
  @include icon-button;
}

.tags-list {
  display: flex;
  border-top: 3px solid #eee;
}
.tags-list__link {
}

.author {
  margin-top: 1em;
  border-top: 1px solid #eee;
}

.author__body {
  margin-top: 1em;
  display: flex;
  column-gap: 20px;
  align-items: center;
}

.author__avatar {
  @include author-avatar;
}

.author__description {
  margin-left: 5em;
  margin-right: 2em;
  font-size: 14px;
  color: rgba(117, 117, 117, 1);
  line-height: 20px;
}

.author__button {
  border: none;
  border-radius: 45px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 7px;
  padding-bottom: 7px;
  color: white;
  background: #2d98f5;
  letter-spacing: 1px;
}
</style>
