import axios from '@/utils/http-common';
import TokenDataService from '@/services/TokenDataService';
import NewPost from '@/types/post/NewPost';

class PostsDataService {
  getAll() {
    return axios.get('/posts/');
  }

  get(id: number) {
    return axios.get(`/posts/${id}/`);
  }

  getByTag(tag: string) {
    return axios.get(`/posts/tag/${tag}/`);
  }

  getMostPopularTags() {
    return axios.get('/posts/most_popular_tags/');
  }

  create(data: NewPost) {
    return axios.post('/posts/', data, TokenDataService.getTokenHeaders());
  }

  update(id: number, data: any) {
    return axios.put(`/posts/${id}/`, data, TokenDataService.getTokenHeaders());
  }

  async delete(id: number) {
    return await axios.delete(
      `/posts/${id}/`,
      TokenDataService.getTokenHeaders(),
    );
  }

  like(id: number) {
    return axios.get(`/posts/${id}/like/`, TokenDataService.getTokenHeaders());
  }

  getUserReadingList() {
    return axios.get(
      '/posts/user_reading_list/',
      TokenDataService.getTokenHeaders(),
    );
  }
}

export default new PostsDataService();
