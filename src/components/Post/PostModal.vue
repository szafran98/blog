<template>
  <div
    class="post-modal"
    :class="{
      'post-modal--hidden': !showModal,
      'post-modal--visible': showModal,
    }"
  >
    <div class="post-modal__author post-author">
      <div class="post-author__username">
        {{ author.username }}
      </div>
      <div class="post-author__description">
        SDE at OYO | Flutter ❤️Android | COEP
      </div>
      <input type="button" class="post-author__button" value="Follow" />
    </div>
    <div class="post-modal__user-actions user-actions">
      <div>
        <button
          class="far fa-heart user-actions__button"
          @click="$emit('like-post')"
        ></button>
        <span>{{ likesCount }}</span>
      </div>
      <button class="far fa-comment user-actions__button"></button>
      <button class="far fa-bookmark user-actions__button"></button>
    </div>
    <div class="post-modal__buttons action-buttons">
      <a
        href="#post-top"
        class="fas fa-arrow-up fa-3x action-buttons__button"
      />
      <a
        href="#post-bottom"
        class="fas fa-3x fa-arrow-down action-buttons__button"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
import { Author } from '@/types/types';
import { useStore } from '@/store';

export default defineComponent({
  name: 'PostModal',
  props: {
    author: {
      type: Object as PropType<Author>,
      required: true,
    },
    likesCount: {
      type: Number,
      required: true,
    },
  },
  setup(props: any, { emit }) {
    const store = useStore();

    const showModal = ref(false);

    const isLoggedIn = store.getters.isLoggedIn;

    document.addEventListener('scroll', (e) => {
      const elY =
        document.getElementById('post-image')!.getBoundingClientRect().top +
        window.scrollY;

      if (window.scrollY > elY) {
        showModal.value = true;
      } else {
        showModal.value = false;
      }
    });

    /*const likePost = () => {
      emit('likePost');
    };*/

    return {
      showModal,
      isLoggedIn,
      //likePost,
    };
  },
});
</script>

<style scoped lang="scss">
.post-modal {
}

@media (max-width: 1500px) {
  .post-modal {
    display: none;
  }
}

@include respond-to(large) {
  .post-modal {
    width: 200px;
    position: fixed;
    top: 100px;
    margin-left: -250px;
  }

  .post-modal--hidden {
    //display: none;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.5s, visibility 0.5s, block 0.5s;
  }

  .post-modal--visible {
    //display: block;
    visibility: visible;

    opacity: 1;
    transition: opacity 0.5s, visibility 0.5s, block 0.5s;
  }

  .post-modal__author {
    padding: 1em 0;
    line-height: 20px;
  }

  .post-author__username {
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 5px;
  }

  .post-author__description {
    font-size: 14px;
  }

  .user-actions {
    display: flex;
    justify-content: space-between;
    padding: 1em 0;
    border-top: 1px solid black;
  }

  .user-actions__button {
    @include icon-button;
    font-size: 22px;

    &:hover {
      color: #555;
    }
  }

  .post-author__button {
    @include follow-button;
    margin-top: 1em;
  }

  .action-buttons {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid black;
    padding: 1em 0;
  }

  .action-buttons__button {
    @include icon-button;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
