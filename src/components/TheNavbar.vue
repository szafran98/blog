<template>
  <!--<a href="#menu" id="menuLink" class="menu-link" @click="changeNavbarState">
    <span></span>
  </a>

  <div id="menu">
    <div class="pure-menu">
      <a href="#company" class="pure-menu-heading">Compoany</a>

      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <a href="#home" class="pure-menu-link">Home</a>
        </li>
        <li class="pure-menu-item">
          <a href="#about" class="pure-menu-link">About</a>
        </li>

        <li class="pure-menu-item menu-item-divided pure-menu-selected">
          <a href="#" class="pure-menu-link">Services</a>
        </li>

        <li class="pure-menu-item">
          <a href="#contact" class="pure-menu-link">Contact</a>
        </li>
      </ul>
    </div>
  </div>-->

  <a href="#menu" id="menuLink" class="menu-link" @click="changeNavbarState">
    <!--<i id="hamburger-icon" class="fas fa-bars fa-2x" style="color: white"></i>-->
    <span></span>
  </a>

  <div id="menu" class="sidebar <!--pure-u-1 pure-u-md-1-4-->">
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
          <li class="nav-item" v-if="isLogged">
            <router-link class="pure-button" :to="{ name: 'ReadingList' }"
              >Reading List</router-link
            >
          </li>
          <li class="nav-item" v-if="isLogged">
            <router-link class="pure-button" :to="{ name: 'AddPost' }"
              >Add post</router-link
            >
          </li>
          <li class="nav-item" v-if="!isLogged">
            <button class="pure-button" @click.prevent="changeModalState">
              Login
            </button>
          </li>

          <li class="nav-item" v-if="isLogged">
            <button class="pure-button" @click.prevent="logout">Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, inject, ref, h } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import { MutationTypes } from '@/store/mutation-types';
import { ModalTypes } from '@/ModalTypes';
import { useTippy } from 'vue-tippy';

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
        //extendNavbar();
        isNavMinified.value = false;
        console.log('extend');
      } else {
        //minifyNavbar();
        isNavMinified.value = true;
        console.log('minify');
      }
    };

    const changeHamburgerSize = (event: any) => {
      const hamburger: HTMLElement = event.target.firstChild;
      hamburger.classList.toggle('fa-3x');
    };

    const changeNavbarState = () => {
      const layout = document.getElementById('layout');
      const menu = document.getElementById('menu');
      const menuLink = document.getElementById('menuLink');

      layout!.classList.toggle('active');
      menu!.classList.toggle('active');
      menuLink!.classList.toggle('active');
    };

    return {
      userData,
      isLogged,
      logout,
      changeModalState,
      changeNavbarSize,
      changeHamburgerSize,
      changeNavbarState,
    };
  },
});
</script>

<style scoped lang="scss">
#layout,
#menu,
.menu-link {
  -webkit-transition: all 0.2s ease-out;
  -moz-transition: all 0.2s ease-out;
  -ms-transition: all 0.2s ease-out;
  -o-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

#layout {
  position: relative;
  left: 0;
  //padding-left: 0;
}
#layout.active #menu {
  left: 250px;
  width: 250px;
}

#layout.active .menu-link {
  left: 250px;
}

/*.content {
  margin: 0 auto;
  padding: 0 2em;
  max-width: 800px;
  margin-bottom: 50px;
  line-height: 1.6em;
}*/

.header {
  margin: 0;
  color: #333;
  text-align: center;
  padding: 2.5em 2em 0;
  border-bottom: 1px solid #eee;
}
.header h1 {
  margin: 0.2em 0;
  font-size: 3em;
  font-weight: 300;
}
.header h2 {
  font-weight: 300;
  color: #ccc;
  padding: 0;
  margin-top: 0;
}

.content-subhead {
  margin: 50px 0 20px 0;
  font-weight: 300;
  color: #888;
}

#menu {
  margin-left: -250px;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  background: #191818;
  overflow-y: auto;
  letter-spacing: 0;
}

#menu a {
  color: #999;
  border: none;
  padding: 0.6em 0 0.6em 0.6em;
}

#menu .pure-menu,
#menu .pure-menu ul {
  border: none;
  background: transparent;
}

#menu .pure-menu ul,
#menu .pure-menu .menu-item-divided {
  border-top: 1px solid #333;
}

#menu .pure-menu li a:hover,
#menu .pure-menu li a:focus {
  background: #333;
}

#menu .pure-menu-selected,
#menu .pure-menu-heading {
  background: #1f8dd6;
}

#menu .pure-menu-selected a {
  color: #fff;
}

#menu .pure-menu-heading {
  font-size: 110%;
  color: #fff;
  margin: 0;
}

.menu-link {
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  background: #000;
  background: rgba(0, 0, 0, 0.7);
  font-size: 10px;
  z-index: 10;
  width: 2em;
  height: auto;
  padding: 2.1em 1.6em;
}

.menu-link:hover,
.menu-link:focus {
  background: #000;
}

.menu-link span {
  position: relative;
  display: block;
}

.menu-link span,
.menu-link span:before,
.menu-link span:after {
  background-color: #fff;
  pointer-events: none;
  width: 100%;
  height: 0.2em;
}

.menu-link span:before,
.menu-link span:after {
  position: absolute;
  margin-top: -0.6em;
  content: ' ';
}

.menu-link span:after {
  margin-top: 0.6em;
}

@media (min-width: 50em) {
  .header,
  .content {
    padding-left: 2em;
    padding-right: 2em;
  }

  #layout {
    padding-left: 250px;
    left: 0;
  }
  #menu {
    left: 250px;
  }

  .menu-link {
    position: fixed;
    left: 250px;
    display: none;
  }

  #layout.active .menu-link {
    left: 250px;
  }
}

@media (max-width: 50em) {
  #layout.active {
    position: relative;
    left: 250px;
  }
}

//////////////////////////////////////

/*@media (min-width: 48em) {
  .header {
    margin: 80% 2em 0;
    text-align: right;
  }
}*/

.header {
  //text-align: center;
  //top: auto;
  //margin: 3em auto;
  letter-spacing: 0;

  .nav-list {
    margin: 0;
    padding: 0;

    .nav-item {
      display: grid;

      button {
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
