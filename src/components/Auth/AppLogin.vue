<template>
  <div id="login-form-container" style="padding: 20px 30px">
    <form
      class="pure-form pure-form-stacked"
      method="post"
      ref="formRef"
      @submit.prevent="login"
    >
      <legend>Authorization</legend>
      <InputEmail
        v-model:value="form.email"
        @input="form.email = $event"
        :validators="emailValidators"
      />
      <span class="pure-form-message">
        <!-- email error -->
      </span>
      <InputPassword
        v-model:value="form.password"
        @input="form.password = $event"
      />
      <div id="login-button-container">
        <button
          type="submit"
          class="pure-button pure-button-primary button-large"
        >
          Sign In
        </button>
      </div>
    </form>
    <a href="" style="letter-spacing: 0; text-decoration: none; color: #0078e7"
      >Forgot password?</a
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from '@/store';
import useInputValidator from '@/composable/useInputValidator';
import { isEmail, minLength } from '@/composable/useInputValidator';
import { ActionTypes } from '@/store/action-types';
import { MutationTypes } from '@/store/mutation-types';
import InputEmail from '@/components/Form/InputEmail.vue';
import InputPassword from '@/components/Form/InputPassword.vue';

export default defineComponent({
  name: 'Login',
  components: {
    InputEmail,
    InputPassword,
  },
  setup() {
    const store = useStore();

    const formRef = ref<HTMLFormElement | null>(null);
    const form = reactive({
      email: '',
      password: '',
    });

    const emailValidators = [isEmail()];

    //const errors = ref({});

    const login = () => {
      //store.dispatch()
      console.log(formRef.value?.checkValidity());
      if (!formRef.value?.checkValidity()) return;
      store.dispatch(ActionTypes.LOGIN, form);
    };

    return {
      form,
      formRef,
      emailValidators,
      login,
    };
  },
});
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

#stacked-email,
.stacked-password,
.button-large {
  margin: auto;
  width: 100%;
}

form > div {
  margin-bottom: 0.5em;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}
legend {
  letter-spacing: 0.2em;
  margin-bottom: 1em;
}
.button-large {
  font-size: 120%;
}
</style>
