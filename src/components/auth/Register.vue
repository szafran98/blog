<template>
  <div id="register-form-container" style="padding: 20px 30px">
    <form
      class="pure-form pure-form-stacked"
      method="post"
      ref="formRef"
      @submit.prevent="register"
    >
      <legend>Registration</legend>
      <InputUsername
        v-model="form.username"
        @input="modify.setUsername"
        :validators="usernameValidators"
      />
      <Suspense>
        <InputEmail
          v-model="form.email"
          @input="modify.setEmail"
          :validators="emailValidators"
        />
      </Suspense>
      <span class="pure-form-message">
        <!-- email error -->
      </span>
      <InputPassword v-model="form.password" @input="modify.setPassword" />
      <InputPassword
        v-model="form.password1"
        @input="modify.setPassword1"
        :placeholder="'Repeat password'"
      />
      <div style="letter-spacing: 0" v-if="!arePasswordsSame">
        Passwords not match
      </div>
      <div id="login-button-container">
        <button
          type="submit"
          class="pure-button pure-button-primary button-large"
          :disabled="!arePasswordsSame"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import InputUsername from '@/components/form/InputUsername.vue';
import InputEmail from '@/components/form/InputEmail.vue';
import InputPassword from '@/components/form/InputPassword.vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import {
  isEmail,
  isEmailAvailable,
  minLength,
} from '@/composable/useInputValidator';

const setProperty = (source: any, key: any) => (value: any) =>
  (source[key] = value);

export default defineComponent({
  name: 'Register',
  components: {
    InputUsername,
    InputEmail,
    InputPassword,
  },
  setup() {
    const store = useStore();

    const formRef = ref<HTMLFormElement | null>(null);
    const form = reactive({
      username: '',
      email: '',
      password: '',
      password1: '',
    });

    const usernameValidators = [minLength(3)];
    const emailValidators = [isEmailAvailable(), isEmail()];

    const register = () => {
      //if (!formRef.value?.checkValidity()) return;

      console.log(form);
      const { password1, ...registrationData } = form;
      store.dispatch(ActionTypes.REGISTER, registrationData);
    };

    const arePasswordsSame = computed(() => form.password === form.password1);

    return {
      form,
      register,
      usernameValidators,
      emailValidators,
      arePasswordsSame,
      modify: {
        setEmail: setProperty(form, 'email'),
        setUsername: setProperty(form, 'username'),
        setPassword: setProperty(form, 'password'),
        setPassword1: setProperty(form, 'password1'),
      },
    };
  },
});
</script>

<style lang="scss"></style>
