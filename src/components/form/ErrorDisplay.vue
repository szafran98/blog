<template>
  <div v-for="(error, index) in errorsList" :key="index">
    <div style="letter-spacing: 0; padding: 5px">{{ error }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRef } from 'vue';

export default defineComponent({
  name: 'ErrorDisplay',
  props: {
    errors: {
      type: Array,
      required: true,
    },
  },
  setup(props: any) {
    const errorsList = toRef(props, 'errors');
    console.log(errorsList);

    return {
      errorsList,
    };
  },
});
</script>

<style scoped></style>
