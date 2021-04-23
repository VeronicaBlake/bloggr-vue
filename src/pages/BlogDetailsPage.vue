<template>
  <!-- NOTE Adding the v-if prevents the page from trying to load before the data returns -->
  <div class="blog-details container" v-if="state.blog">
    <div class="row justify-content-start card shadow my-5 py-5">
      <div class="col-12">
        <div class="row">
          <div class="col-4 text-center">
            <router-link :to="{name: 'Account', params: {id: state.blog.creator.id}}">
              <img class="rounded-circle" :src="state.blog.creator.picture" alt="">
            </router-link>
          </div>
          <div class="col-8">
            <h2><i> {{ state.blog.creator.name }} </i></h2>
            <h3><u> {{ state.blog.title }} </u></h3>
            <h4>{{ state.blog.body }}</h4>
          </div>
        </div>
        <!-- NOTE Account Details for Blog Owner -->
      </div>
      <!-- NOTE This v-if disables the input form if the User does not own the blog -->
      <div class="col" v-if="state.account.id === state.blog.creator.id">
        <!-- NOTE Form Element to Add a Blog Entry -->
        <button class="btn btn-danger btn-large" @click="deleteBlog">
          DELETE
        </button>
      </div>
      <div class="col" v-for="blog in state.blogs" :key="blog.id">
        <!-- NOTE Blog Element that renders individual Blog Entries -->
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import Notification from '../utils/Notification'

export default {
  name: 'BlogDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      newBlog: {},
      blog: computed(() => AppState.activeBlog),
      // NOTE USER has a few bonus properties such as user.isAuthenticated
      user: computed(() => AppState.user),
      account: computed(() => AppState.account)
    })
    onMounted(async() => {
      try {
        await blogsService.getActive(route.params.id)
      } catch (error) {
        Notification.toast('Error: ' + error, 'error')
      }
    })
    return {
      route,
      state,
      async addBlog() {
        try {
          await blogsService.addBlog(route.params.id, state.newBlog)
          state.newBlog = {}
        } catch (error) {
          Notification.toast('New Blog Added!', 'success')
        }
      },
      async deleteBlog() {
        try {
          await blogsService.deleteBlog(state.blog.id)
          // Router is a toolset, here used to change the page after the delete is completed
          // returning the user to the blogs page
          AppState.activeBlog = null
        } catch (error) {
          Notification.toast('Error: ' + error, 'error')
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
