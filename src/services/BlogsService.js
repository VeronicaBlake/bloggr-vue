import { AppState } from '../AppState'
import router from '../router'
import { api } from './AxiosService'

class BlogsService {
  async getAll() {
    const res = await api.get('api/blogs')
    AppState.blogs = res.data
  }

  async getActive(id) {
    const res = await api.get('api/blogs/' + id)
    AppState.activeBlog = res.data
  }

  async getMyBlogs() {
    const res = await api.get(`api/blogs?creatorId=${AppState.account.id}`)
    AppState.myBlogs = res.data
  }

  async getByProfileId(id) {
    const res = await api.get(`api/blogs?creatorId=${id}`)
    AppState.activeBlogs = res.data
  }

  async create(data) {
    const res = await api.post('api/blogs', data)
    router.push({ name: 'BlogDetails', params: { id: res.data.id } })
    // this.getAll()
  }

  async addBlog(blogId, blog) {
    await api.post(`api/blogs/${blogId}`, blog)
    this.getActive(blogId)
  }

  async deleteBlog(blogId) {
    await api.delete(`api/blog/${blogId}`)
  }
}

export const blogsService = new BlogsService()
