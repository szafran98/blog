import { MutationTypes } from '@/store/mutation-types';
import { State } from '@/store/index';
import { MutationTree } from 'vuex';

export type Mutations<S = State> = {
  [MutationTypes.SET_POSTS](state: S, payload: any): void;
  [MutationTypes.DELETE_POST](state: S, payload: any): void;
  [MutationTypes.STORE_USER_DATA](state: S, payload: any): void;
  [MutationTypes.REMOVE_USER_DATA](state: S): void;
  [MutationTypes.CHANGE_MODAL_STATE](state: S, payload: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_POSTS](state: State, payload: any) {
    state.posts = payload;
  },
  [MutationTypes.DELETE_POST](state: State, payload: any) {
    state.posts = state.posts.filter((post) => post.id !== payload);
  },
  [MutationTypes.STORE_USER_DATA](state: State, payload: any) {
    console.log(payload);
    state.userData = payload;
  },
  [MutationTypes.REMOVE_USER_DATA](state: State) {
    state.userData = null;
  },
  [MutationTypes.CHANGE_MODAL_STATE](state: State, payload: boolean) {
    state.showModal = payload;
    console.log(state.showModal);
  },
};
