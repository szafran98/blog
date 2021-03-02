import axios from '@/utils/http-common'
import TokenDataService from '@/services/TokenDataService'

class PostsDataService {
  getAll() {
    return axios.get('/posts/')
  }

  get(id: number) {
    return axios.get(`/posts/${id}/`)
  }

  getByTag(tag: string) {
    return axios.get(`/posts/tag/%23${tag}/`)
  }

  create(data: any) {
    return axios.post('/posts/', data, TokenDataService.getTokenHeaders())
  }

  update(id: number, data: any) {
    return axios.put(`/posts/${id}/`, data)
  }

  async delete(id: number) {
    return await axios.delete(
      `/posts/${id}/`,
      TokenDataService.getTokenHeaders(),
    )
  }
}

export default new PostsDataService()
