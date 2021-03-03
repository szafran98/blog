<template>
  <div id="password-container">
    <input
      class="stacked-password"
      type="password"
      :placeholder="placeholder || 'Password'"
      v-model="input"
    />
    <ErrorDisplay :errors="errors" />
  </div>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue';
import useInputValidator from '../../composable/useInputValidator';
import ErrorDisplay from '@/components/form/ErrorDisplay.vue';

export default defineComponent({
  name: 'InputPassword',
  components: {
    ErrorDisplay,
  },
  props: {
    value: String,
    placeholder: {
      type: String,
      required: false,
    },
    validators: {
      type: Array,
      required: false,
    },
  },
  emits: ['input'],
  setup(props: any, { emit }) {
    console.log(props);

    //const placeholder = toRef(props, 'placeholder');

    const { input, errors } = useInputValidator(
      props.value,
      props.validator || [],
      (value) => emit('input', value),
    );

    return {
      input,
      errors,
      //placeholder,
    };
  },
});
</script>

<style scoped></style>
