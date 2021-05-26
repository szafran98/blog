import { GetterTree } from 'vuex';
import { State } from '@/store/index';

export type Getters<S = State> = {
  //doubledCounter(state: State): number;
  posts(state: State): any;
  userData(state: State): any;
  isLoggedIn(state: State): any;
  modal(state: State): any;
};

export const getters: GetterTree<State, State> & Getters = {
  //doubledCounter: (state) => state.count * 2
  posts(state: State): any {
    return state.posts;
  },
  userData(state: State): any {
    return state.userData;
  },
  isLoggedIn(state: State): boolean {
    return state.userData !== null;
  },
  modal(state: State): any {
    return state.modal;
  },
};
