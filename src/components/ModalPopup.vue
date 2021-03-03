<template>
  <div class="modal-container-header">
    <h3 style="letter-spacing: 0">
      Please verify that you are human by clicking sent link on email.
    </h3>
    <input
      type="button"
      class="pure-button pure-button-primary button-large"
      value="Go to login"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { MutationTypes } from '@/store/mutation-types';
import { useStore } from '@/store';

export default defineComponent({
  name: 'ModalPopup',
  setup() {
    //const store = useStore();

    /*const changeModalState = (event: any) => {
          console.log(event.target);

          if (event.target === document.querySelector('.modal-wrapper'))
            store.commit(MutationTypes.CHANGE_MODAL_STATE, false);
        };*/

    return {
      //changeModalState,
    };
  },
});
</script>

<style scoped></style>
