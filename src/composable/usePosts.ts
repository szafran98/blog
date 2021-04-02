import { ref, reactive, computed } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import PostDataService from '@/services/PostDataService';
import { PostResponse } from '@/types/types';
import NewPost from '@/types/post/NewPost';
import { AxiosError, AxiosResponse } from 'axios';

const posts = ref([] as PostResponse[]);

export function usePosts() {
  const getPost = (id: number) => {
    return posts.value.find((post) => post.id === id);
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

  return {
    getPost,
    getPosts,
    getPostsByTag,
    getMostPopularTags,
    deletePost,
    addPost,
    editPost,
    posts: computed(() => posts.value),
  };
}
