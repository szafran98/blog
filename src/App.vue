<template>
  <div id="layout" class="home pure-g">
    <Navbar />
    <div class="content pure-u-1 pure-u-md-3-4">
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
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import Navbar from '@/components/Navbar.vue';
import Modal from '@/components/Modal.vue';

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
html {
  line-height: 1.15;
}
*:focus {
  outline: none;
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
