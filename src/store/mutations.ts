import { MutationTypes } from '@/store/mutation-types';
import { State } from '@/store/index';
import { MutationTree } from 'vuex';
import { PostResponse } from '@/types/types';

export type Mutations<S = State> = {
  [MutationTypes.SET_POSTS](state: S, payload: PostResponse[]): void;
  [MutationTypes.EDIT_POST](state: S, payload: PostResponse): void;
  [MutationTypes.DELETE_POST](state: S, payload: number): void;
  [MutationTypes.STORE_USER_DATA](state: S, payload: any): void;
  [MutationTypes.REMOVE_USER_DATA](state: S): void;
  [MutationTypes.CHANGE_MODAL_STATE](state: S, payload: any): void;
  [MutationTypes.SET_POST_TOP_REF](state: S, payload: any): void;
  [MutationTypes.SET_POST_BOTTOM_REF](state: S, payload: any): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_POSTS](state: State, payload: PostResponse[]) {
    state.posts = payload;
  },
  [MutationTypes.EDIT_POST](state: State, payload: PostResponse) {
    console.log(state.posts);
    const postToUpdate = state.posts.find((post) => post.id === payload.id);
    console.log(postToUpdate);
    Object.assign(postToUpdate, payload);
    console.log(postToUpdate);
  },
  [MutationTypes.DELETE_POST](state: State, payload: number) {
    state.posts = state.posts.filter((post) => post.id !== payload);
  },
  [MutationTypes.STORE_USER_DATA](state: State, payload: any) {
    console.log(payload);
    state.userData = payload;
  },
  [MutationTypes.REMOVE_USER_DATA](state: State) {
    state.userData = null;
  },
  [MutationTypes.CHANGE_MODAL_STATE](state: State, payload: any) {
    console.log(payload);
    state.modal = payload;
    console.log(state.modal);
  },
  [MutationTypes.SET_POST_TOP_REF](state: State, payload: any) {
    console.log(payload);
    state.postTopRef = payload;
    console.log(state.postTopRef);
  },
  [MutationTypes.SET_POST_BOTTOM_REF](state: State, payload: any) {
    console.log(payload);
    state.postBottomRef = payload;
  },
};
