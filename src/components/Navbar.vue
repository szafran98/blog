<template>
  <div class="sidebar pure-u-1 pure-u-md-1-4">
    <div class="header">
      <h1 class="brand-title">A sample blog</h1>
      <h2 class="brand-tagline">Creating a blog layout</h2>
      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link class="pure-button" :to="{ name: 'Home' }"
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <a
              class="pure-button"
              v-if="!isLogged"
              @click.prevent="changeModalState"
              >Login</a
            >
          </li>

          <li class="nav-item">
            <a class="pure-button" v-if="isLogged" @click.prevent="logout"
              >Logout</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
  <!--
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link v-if="!isLogged" :to="{ name: 'Login' }">Login</router-link>
    <a v-if="isLogged" @click="logout">Logout</a>
    <div v-if="isLogged">Logged as {{ userData.username }}</div>
  </div>
  -->
</template>

<script lang="ts">
import { defineComponent, computed, inject } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import { MutationTypes } from '@/store/mutation-types';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const store = useStore();

    const userData = computed(() => store.getters.userData || '');
    const isLogged = inject('isLogged');
    const logout = () => store.dispatch(ActionTypes.LOGOUT);
    const changeModalState = () =>
      store.commit(MutationTypes.CHANGE_MODAL_STATE, true);

    return {
      userData,
      isLogged,
      logout,
      changeModalState,
    };
  },
});
</script>

<style lang="scss">
@media (min-width: 48em) {
  .header {
    margin: 80% 2em 0;
    text-align: right;
  }
}

.header {
  //text-align: center;
  top: auto;
  //margin: 3em auto;

  .nav-list {
    margin: 0;
    padding: 0;
    list-style: none;
    //display: grid;

    .nav-item {
      display: grid;

      a {
        background: transparent;
        border: 2px solid rgb(176, 202, 219);
        color: #fff;
        margin-top: 1em;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-size: 85%;
      }
    }
  }
}
</style>
