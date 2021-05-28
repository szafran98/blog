<template>
  <div id="email-container">
    <input
      id="stacked-email"
      type="email"
      placeholder="Email"
      v-model="input"
    />
    <ErrorDisplay :errors="errors" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useInputValidator, {
  isEmailAvailable,
} from '../../composable/useInputValidator';
import { isEmail } from '@/composable/useInputValidator';
import ErrorDisplay from '@/components/Form/ErrorDisplay.vue';

export default defineComponent({
  name: 'InputEmail',
  components: {
    ErrorDisplay,
  },
  props: {
    value: String,
    validators: {
      type: Array,
      required: false,
    },
  },
  emits: ['input'],
  setup(props: any, { emit }) {
    //console.log(props.validators);
    const { input, errors } = useInputValidator(
      props.value,
      props.validators,
      (value) => emit('input', value),
    );

    return {
      input,
      errors,
    };
  },
});
</script>

<style scoped></style>
