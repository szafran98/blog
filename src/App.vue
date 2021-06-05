<template>
  <div id="layout" class="layout" v-cloak v-show="arePostsLoaded">
    <Navbar />
    <div id="content" class="layout__content content">
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <h1>Loading...</h1>
        </template>
      </Suspense>
      <TheFooter />
    </div>
    <Modal v-if="modal.state" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide, onMounted } from 'vue';
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import Navbar from '@/components/TheNavbar.vue';
import Modal from '@/components/TheModal.vue';
import TheFooter from '@/components/TheFooter.vue';
import { usePosts } from '@/composable/usePosts';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Modal,
    TheFooter,
  },
  setup() {
    const store = useStore();
    const { posts, arePostsLoaded, getPosts } = usePosts();

    const modal = computed(() => store.state.modal);

    onMounted(async () => await getPosts());

    provide(
      'isLogged',
      computed(() => store.getters.isLoggedIn),
    );

    store.dispatch(ActionTypes.GET_USER_DATA);

    return {
      arePostsLoaded,
      modal,
    };
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

[v-cloak] {
  display: none;
}

.layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.layout__content {
  //width: 680px;
  //margin: auto;
  margin-left: 0;
}

@include respond-to(small) {
  .layout__content {
    margin-left: 0;
  }
}

@include respond-to(small-landscape) {
  .layout__content {
    margin-left: 250px;
  }
}

@include respond-to(medium) {
  .layout__content {
    margin-left: 250px;
  }
}

@include respond-to(large) {
  .layout__content {
    margin-left: 250px;
  }
}

.layout {
  //display: flex;
}

html {
  line-height: 1.15;
  scroll-behavior: smooth;
}
body {
  margin: 0;
  padding: 0;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

*:focus {
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

a {
  text-decoration: none;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: #2c3e50;
}

.router-link-exact-active {
  background: #42b983;
  color: #222222;
}

#nav {
  //padding: 30px;

  a {
    //font-weight: bold;
    //color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
      background: #0078e7;
    }
  }
}
</style>
