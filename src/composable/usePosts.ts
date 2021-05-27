import { ref, reactive, computed } from 'vue';
import useStore from '@/store';
import { ActionTypes } from '@/store/action-types';
import PostDataService from '@/services/PostDataService';
import { PostResponse } from '@/types/types';
import NewPost from '@/types/post/NewPost';
import { AxiosError, AxiosResponse } from 'axios';
import { MutationTypes } from '@/store/mutation-types';
import { ModalTypes } from '@/ModalTypes';
import TokenDataService from '@/services/TokenDataService';

const store = useStore;
const posts = ref([] as PostResponse[]);

export function usePosts() {
  const getPost = async (id: number) => {
    let post = posts.value.find((post) => post.id === id);
    if (post === undefined) {
      const response = await PostDataService.get(id);
      post = await response.data;
    }
    return post;
  };

  const getPosts = async () => {
    const response = await PostDataService.getAll();
    posts.value = await response.data;
    console.log(posts.value);
  };

  const getPostsByTag = async (tag: string) => {
    const response = await PostDataService.getByTag(tag);
    posts.value = await response.data;
  };

  const getUserReadingList = async () => {
    try {
      const response = await PostDataService.getUserReadingList();
      return response.data;
    } catch (e) {
      console.log(e.response);
    }
  };

  const addToReadingList = async (id: number) => {
    try {
      const response = PostDataService.addToReadingList(id);
      return response;
    } catch (e) {
      console.log(e.response);
    }
  };

  const removeFromReadingList = async (id: number) => {
    try {
      const response = PostDataService.removeFromReadingList(id);
      return response;
    } catch (e) {
      console.log(e.response);
    }
  };

  const getMostPopularTags = async () => {
    const response = await PostDataService.getMostPopularTags();
    return response.data;
  };

  const deletePost = async (id: number) => {
    try {
      await PostDataService.delete(id);
      posts.value = posts.value.filter((post: any) => post.id !== id);
    } catch (e) {
      console.log(e);
    }
  };

  const addPost = async (postData: NewPost) => {
    try {
      const response = await PostDataService.create(postData);
      console.log(response);
      posts.value.unshift(response.data);
      return response;
    } catch (e) {
      console.log(e.response);
    }
  };

  const editPost = async (postData: any) => {
    try {
      const response = await PostDataService.update(postData.id, postData);
    } catch (e) {
      console.log(e.response);
    }
  };

  const likePost = async (postId: number) => {
    try {
      const response = await PostDataService.like(postId);
      console.log(response);
      return response;
    } catch (e) {
      console.log(e.response);
      store.commit(MutationTypes.CHANGE_MODAL_STATE, {
        state: true,
        type: ModalTypes.POPUP,
        message: e.response.data.message,
      });
    }
  };

  return {
    getPost,
    getPosts,
    getPostsByTag,
    getUserReadingList,
    addToReadingList,
    removeFromReadingList,
    getMostPopularTags,
    deletePost,
    addPost,
    editPost,
    likePost,
    posts: computed(() => posts.value),
  };
}
