<template>
  <div class="auth-form-container">
    <div class="modal-container-header">
      <input
        type="button"
        value="Login"
        :class="{ 'not-active-btn': selectedForm === 'register' }"
        @click="selectedForm = 'login'"
      />
      <input
        type="button"
        value="Register"
        :class="{ 'not-active-btn': selectedForm === 'login' }"
        @click="selectedForm = 'register'"
      />
    </div>
    <component :is="activeComponent"></component>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import Login from '@/components/auth/Login.vue';
import Register from '@/components/auth/Register.vue';
import { MutationTypes } from '@/store/mutation-types';
import { useStore } from '@/store';

export enum AuthForm {
  REGISTER,
  LOGIN,
}

export default defineComponent({
  name: 'ModalForm',
  components: {
    Login,
    Register,
  },
  setup() {
    //const store = useStore();
    const selectedForm = ref('login');

    const activeComponent = computed(() => {
      if (selectedForm.value === 'login') return Login;
      return Register;
    });

    /*const changeModalState = (event: any) => {
      console.log(event.target);

      if (event.target === document.querySelector('.modal-wrapper'))
        store.commit(MutationTypes.CHANGE_MODAL_STATE, false);
    };*/

    return {
      activeComponent,
      selectedForm,
      //changeModalState,
    };
  },
});
</script>

<style scoped lang="scss">
.auth-form-container {
  padding: 0;
}

.modal-container-header {
  display: flex;

  .not-active-btn {
    background: #eeeeee;
  }

  input {
    width: 100%;
    padding: 1em;
    background: transparent;
    border: 0;

    &:hover {
      //box-shadow: #222222;
      box-shadow: inset 0 0 5em #fff;
      cursor: pointer;
    }
  }
}
</style>
