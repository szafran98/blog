<template>
  <div id="username-container">
    <input
      id="stacked-username"
      type="text"
      placeholder="Username"
      v-model="input"
    />
    <ErrorDisplay :errors="errors" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useInputValidator from '@/composable/useInputValidator';
import ErrorDisplay from '@/components/form/ErrorDisplay.vue';
import { minLength } from '@/composable/useInputValidator';

export default defineComponent({
  name: 'InputUsername',
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

<style scoped lang="scss">
#stacked-username {
  width: 100%;
}
</style>
