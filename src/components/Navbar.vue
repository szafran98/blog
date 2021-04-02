<template>
  <a
    href="#menu"
    id="menu-link"
    class="menu-link"
    @click="changeNavbarSize"
    @mouseenter="changeHamburgerSize"
    @mouseleave="changeHamburgerSize"
  >
    <i id="hamburger-icon" class="fas fa-bars fa-2x" style="color: white"></i>
  </a>
  <div id="menu" class="sidebar pure-u-1 pure-u-md-1-4">
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
            <router-link
              class="pure-button"
              v-if="isLogged"
              :to="{ name: 'AddPost' }"
              >Add post</router-link
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
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import { MutationTypes } from '@/store/mutation-types';
import { ModalTypes } from '@/ModalTypes';
import { extendNavbar, minifyNavbar } from '@/utils/util-functions';
import { onBeforeRouteUpdate } from 'vue-router';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const store = useStore();

    const userData = computed(() => store.getters.userData || '');
    const isLogged = inject('isLogged');
    const isNavMinified = ref(true);

    const logout = () => store.dispatch(ActionTypes.LOGOUT);
    const changeModalState = () =>
      store.commit(MutationTypes.CHANGE_MODAL_STATE, {
        state: true,
        type: ModalTypes.FORM,
      });

    const changeNavbarSize = () => {
      if (isNavMinified.value) {
        extendNavbar();
        isNavMinified.value = false;
        console.log('extend');
      } else {
        minifyNavbar();
        isNavMinified.value = true;
        console.log('minify');
      }
    };

    const changeHamburgerSize = (event: any) => {
      const hamburger: HTMLElement = event.target.firstChild;
      hamburger.classList.toggle('fa-3x');
    };

    return {
      userData,
      isLogged,
      logout,
      changeModalState,
      changeNavbarSize,
      changeHamburgerSize,
    };
  },
});
</script>

<style lang="scss">
#menu-link {
  top: 0;
  left: 0;
  position: fixed;
  width: 30px;
  height: 30px;
  background: #222222;

  &:hover {
    width: 50px;
    height: 50px;
    background-color: #3d5e5d;
    box-shadow: 0px 1px 1px rgba(46, 229, 157, 0.4);
    color: #fff;
  }

  #hamburger-icon {
    margin-left: 4px;

    &:hover {
      ///transform: translateY(-7px);
    }
  }
}

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
