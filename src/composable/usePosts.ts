import { ref, reactive, computed } from 'vue';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/action-types';
import PostDataService from '@/services/PostDataService';
import { PostResponse } from '@/types/types';
import NewPost from '@/types/post/NewPost';

const posts = ref([] as PostResponse[]);

export function usePosts() {
  const getPosts = async () => {
    const response = await PostDataService.getAll();
    posts.value = await response.data;
    console.log(posts.value);
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
    } catch (e) {
      console.log(e.response);
    }
  };

  return {
    getPosts,
    deletePost,
    addPost,
    posts: computed(() => posts.value),
  };
}
