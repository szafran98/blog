import { ActionTypes } from '@/store/action-types';
import { Mutations } from '@/store/mutations';
import { Action, ActionContext, ActionTree } from 'vuex';
import { key, State } from '@/store/index';
import axios from '@/utils/http-common';
import { MutationTypes } from '@/store/mutation-types';
import TokenDataService from '@/services/TokenDataService';
import PostDataService from '@/services/PostDataService';

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1],
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

export interface Actions {
  [ActionTypes.GET_POSTS](
    { commit }: AugmentedActionContext,
    payload: any,
  ): Promise<any>;
  [ActionTypes.DELETE_POST](
    { commit }: AugmentedActionContext,
    payload: any,
  ): Promise<any>;
  [ActionTypes.REGISTER](
    { commit }: AugmentedActionContext,
    payload: any,
  ): Promise<any>;
  [ActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    payload: any,
  ): Promise<any>;
  [ActionTypes.GET_USER_DATA]({
    commit,
  }: AugmentedActionContext): Promise<void>;
  [ActionTypes.LOGOUT]({ commit }: AugmentedActionContext): void;
}

export const actions: ActionTree<State, State> & Actions = {
  [ActionTypes.GET_POSTS]({ commit }) {
    return axios.get('http://localhost:8000/api/posts/').then((res) => {
      console.log(res);
      commit(MutationTypes.SET_POSTS, res.data);
    });
  },
  [ActionTypes.DELETE_POST]({ commit }, id: number) {
    return PostDataService.delete(id)
      .then((res) => {
        console.log(res);
        commit(MutationTypes.DELETE_POST, id);
      })
      .catch((err) => console.log(err.response));
  },
  [ActionTypes.REGISTER]({ commit }, registrationData: any) {
    console.log(registrationData);
    return axios
      .post('http://localhost:8000/auth/users/', registrationData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err.response));
  },
  [ActionTypes.LOGIN]({ commit, dispatch }, loginData: any) {
    console.log(loginData);
    return axios
      .post('http://localhost:8000/auth/jwt/create', loginData)
      .then((res) => {
        TokenDataService.setToken(res.data);
        dispatch(ActionTypes.GET_USER_DATA);
        commit(MutationTypes.CHANGE_MODAL_STATE, false);
        console.log(TokenDataService.getAccessToken());
      })
      .catch((err) => console.log(err.response));
  },
  [ActionTypes.LOGOUT]({ commit }) {
    TokenDataService.removeToken();
    commit(MutationTypes.REMOVE_USER_DATA);
  },
  [ActionTypes.GET_USER_DATA]({ commit }) {
    return axios
      .get(
        'http://127.0.0.1:8000/auth/users/me/',
        TokenDataService.getTokenHeaders(),
      )
      .then((res) => commit(MutationTypes.STORE_USER_DATA, res.data))
      .catch((err) => console.log(err.response));
  },
};
