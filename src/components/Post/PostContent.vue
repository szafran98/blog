<template>
  <div class="post-markdown line-numbers" v-html="compiledMarkdown"></div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import marked from 'marked';
import * as Prism from 'prismjs';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-markdown';
import 'prismjs/themes/prism-tomorrow.css';

export default defineComponent({
  name: 'PostContent',
  props: {
    content: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const compiledMarkdown = computed(() => {
      return marked(props.content);
    });

    /*onMounted(() => {
      setTimeout(() => Prism.highlightAll());
    });*/

    return {
      compiledMarkdown,
    };
  },
});
</script>

<style scoped lang="scss">
.post-markdown {
  font-size: 18px;
  line-height: 28px;
  font-family: charter, Georgia, Cambria, 'Times New Roman', Times, serif;
  margin-top: 2em;
  width: 100%;
}
</style>
