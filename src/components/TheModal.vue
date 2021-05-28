<template>
  <transition name="modal" @click="changeModalState">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <component :is="activeComponent" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import ModalForm from '@/components/ModalForm.vue';
import ModalPopup from '@/components/ModalPopup.vue';
import { MutationTypes } from '@/store/mutation-types';
import { useStore } from '@/store';
import { ModalTypes } from '@/ModalTypes';

export default defineComponent({
  name: 'Modal',
  components: {
    ModalForm,
    ModalPopup,
  },
  setup() {
    const store = useStore();

    const activeModal = computed(() => store.state.modal.type);

    const activeComponent = computed(() => {
      if (activeModal.value === ModalTypes.FORM) return ModalForm;
      return ModalPopup;
    });

    const changeModalState = (event: any) => {
      console.log(event.target);

      if (event.target === document.querySelector('.modal-wrapper'))
        store.commit(MutationTypes.CHANGE_MODAL_STATE, false);
    };

    return {
      activeModal,
      activeComponent,
      ModalTypes,
      changeModalState,
    };
  },
});
</script>

<style scoped lang="scss">
.modal-container {
  padding: 0;
}
</style>
