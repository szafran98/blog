// store.ts
import { InjectionKey } from 'vue';
import {
  createStore,
  Store as VuexStore,
  useStore as baseUseStore,
  CommitOptions,
  DispatchOptions,
} from 'vuex';
import { Mutations, mutations } from '@/store/mutations';
import { Getters, getters } from '@/store/getters';
import { Actions, actions } from '@/store/actions';

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions,
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

// define your typings for the store state
export interface State {
  posts: any[];
  userData: any;
  modal: any;
}

export const state: State = {
  posts: [],
  userData: null,
  modal: false,
};

// define injection key
export const key: InjectionKey<Store> = Symbol();

export function useStore(): Store {
  return baseUseStore(key);
}

export default createStore({
  state,
  getters,
  mutations,
  actions,
  modules: {},
  strict: true,
});
