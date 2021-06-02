<template>
  <div id="layout" class="home">
    <Navbar />
    <div id="content" class="content">
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <h1>Loading...</h1>
        </template>
      </Suspense>
    </div>
    <Modal v-if="modal.state" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, provide } from 'vue';
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import Navbar from '@/components/TheNavbar.vue';
import Modal from '@/components/TheModal.vue';

function getUserData() {
  return useStore().getters.userData;
}

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
    Modal,
  },
  setup() {
    const store = useStore();
    //let isFetching = ref(true)
    //let userData
    const modal = computed(() => store.state.modal);

    provide(
      'isLogged',
      computed(() => store.getters.isLoggedIn),
    );

    store.dispatch(ActionTypes.GET_USER_DATA);
    return {
      modal,
    };
  },
});
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;500&family=Roboto:wght@300;400;500;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
.content {
  //width: 680px;
  //margin: auto;
  margin-left: 250px;
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
  background: #42b983 !important;
  color: #222222 !important;
}

#nav {
  //padding: 30px;

  a {
    //font-weight: bold;
    //color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
      background: #0078e7 !important;
    }
  }
}
</style>
