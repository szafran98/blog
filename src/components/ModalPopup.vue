<template>
  <div class="modal-popup">
    <div class="modal-btn-container">
      <button
        class="fas fa-times fa-2x icon-button"
        @click="closePopup"
      ></button>
    </div>
    <h3 style="letter-spacing: 0">
      {{ message }}
    </h3>
    <!--    <input
      type="button"
      class="pure-button pure-button-primary button-large"
      value="Go to login"
    />-->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { MutationTypes } from '@/store/mutation-types';
import { useStore } from '@/store';

export default defineComponent({
  name: 'ModalPopup',
  setup() {
    const store = useStore();

    const message = computed(() => store.getters.modal.message);

    const closePopup = () => {
      store.commit(MutationTypes.CHANGE_MODAL_STATE, false);
    };

    /*const changeModalState = (event: any) => {
          console.log(event.target);

          if (event.target === document.querySelector('.modal-wrapper'))
            store.commit(MutationTypes.CHANGE_MODAL_STATE, false);
        };*/

    return {
      //changeModalState,
      message,
      closePopup,
    };
  },
});
</script>

<style scoped lang="scss">
.modal-popup {
  display: flex;
  flex-direction: column;

  .modal-btn-container {
    align-self: flex-end;

    button {
      &:hover {
        color: #1f8dd6;
      }
    }
  }

  h3 {
    //padding: 2em;
    text-align: center;
  }
}
</style>
