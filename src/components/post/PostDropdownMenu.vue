<template>
  <div id="post-dropdown">
    <ul>
      <li>
        <div>
          <button @click="logger">Dismiss this article</button>
        </div>
      </li>
      <li>
        <div>
          <button>Ignore author articles</button>
        </div>
      </li>
      <li>
        <div>
          <button>Report this article</button>
        </div>
      </li>
      <li>
        <div>
          <button>Block this author</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, h, resolveComponent } from 'vue';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/dist/border.css';
import CodeSnippet from '@/components/CodeSnippet.vue';

export default defineComponent({
  name: 'PostDropdownMenu',
  setup() {
    const logger = () => alert('elooo');

    return {
      logger,
    };
  },
});
</script>

<style lang="scss">
.tippy-box[data-theme~='custom'] {
  //color: white;
  background: white;

  box-shadow: rgb(230, 230, 230) 0px 1px 4px;
  border: 1px solid rgba(230, 230, 230, 1);
}

.tippy-box[data-theme~='custom'][data-placement^='top'] > .tippy-arrow::before {
  border-top-color: white;
}
.tippy-box[data-theme~='custom'][data-placement^='bottom']
  > .tippy-arrow::before {
  border-bottom-color: white;
}
.tippy-box[data-theme~='custom'][data-placement^='left']
  > .tippy-arrow::before {
  border-left-color: white;
}
.tippy-box[data-theme~='custom'][data-placement^='right']
  > .tippy-arrow::before {
  border-right-color: white;
}

#post-dropdown {
  ul {
    color: black;
    list-style-type: none;
    padding-inline-start: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    li {
      padding-top: 0.5em;
      padding-bottom: 0.5em;

      button {
        border: none;
        background: inherit;
        cursor: pointer;
        color: rgba(117, 117, 117, 1);

        &:hover {
          color: black;
        }
      }
    }
  }
}
</style>
