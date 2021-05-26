<template>
  <div class="line-numbers">
    <button @click="alercik">Klik</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'CodeSnippet',
  setup() {
    const alercik = () => alert('siema');
    return { alercik };
  },
});
</script>

<style scoped></style>
