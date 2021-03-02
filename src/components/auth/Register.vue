<template>
  <div id="register-form-container" style="padding: 20px 30px">
    <form
      class="pure-form pure-form-stacked"
      method="post"
      ref="formRef"
      @submit.prevent="register"
    >
      <legend>Registration</legend>
      <InputUsername v-model="form.username" @input="modify.setUsername" />
      <Suspense>
        <InputEmail v-model="form.email" @input="modify.setEmail" />
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
        <div style="letter-spacing: 0">
          {{ form.password === form.password1 }}
        </div>
        <div style="letter-spacing: 0">{{ arePasswordsSame }}</div>
        <div style="letter-spacing: 0">{{ arePasswordsSame }}</div>
        <button
          type="submit"
          class="pure-button pure-button-primary button-large"
          :disabled="!arePasswordsSame"
        >
          Sign Up
        </button>
      </div>
    </form>
    <a href="" style="letter-spacing: 0; text-decoration: none; color: #0078e7"
      >Forgot password?</a
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed } from 'vue';
import InputUsername from '@/components/form/InputUsername.vue';
import InputEmail from '@/components/form/InputEmail.vue';
import InputPassword from '@/components/form/InputPassword.vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';

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
