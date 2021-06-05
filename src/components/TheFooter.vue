<template>
  <footer class="footer" v-show="arePostsLoaded">
    <div class="footer__site-info site-info">
      <div class="site-info__top">
        <div class="site-info__text">
          <h2>Learn more.</h2>
          <span
            >Medium is an open platform where 170 million readers come to find
            insightful and dynamic thinking. Here, expert and undiscovered
            voices alike dive into the heart of any topic and bring new ideas to
            the surface. Learn more</span
          >
        </div>
        <div class="site-info__text">
          <h2>Make Inpress yours.</h2>
          <span
            >Follow the writers, publications, and topics that matter to you,
            and you’ll see them on your homepage and in your inbox.
            Explore</span
          >
        </div>
        <div class="site-info__text">
          <h2>Share your thinking</h2>
          <span
            >If you have a story to tell, knowledge to share, or a perspective
            to offer — welcome home. It’s easy and free to post your thinking on
            any topic. Write on Medium</span
          >
        </div>
      </div>
      <div class="site-info__bottom bottom">
        <img
          src="@/assets/images/logo-compact.png"
          alt=""
          class="bottom__logo"
        />
        <div class="bottom__links">
          <a href="" class="bottom__link">About</a>
          <a href="" class="bottom__link">Help</a>
          <a href="" class="bottom__link">Legal</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePosts } from '@/composable/usePosts';

export default defineComponent({
  name: 'TheFooter',
  setup() {
    const { arePostsLoaded } = usePosts();

    return {
      arePostsLoaded,
    };
  },
});
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  flex-direction: column;
  //background-color: rgba(0, 0, 0, 0.9);
  background: #191818;
  color: white;
  //padding: 60px 0;
  padding-top: 60px;
  margin-top: 60px;
}

.site-info {
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  max-width: 75%;
  margin: auto;
}

.site-info__top {
  display: flex;
  justify-content: space-between;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.54);
}

.site-info__text {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 20px;
  max-width: 400px;
  margin: 0 12px;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bottom__logo {
}

.bottom__links {
  display: flex;
}

.bottom__link {
  color: white;
  //padding: 1em;
  padding: 0 1em;

  &:last-child {
    padding-right: 0;
  }
}
</style>
