<template>
  <!-- NOTE Adding the v-if prevents the page from trying to load before the data returns -->
  <div class="blog-details container" v-if="state.blog">
    <h1>Hello Blog Details</h1>
    {{ route.params.id }}
    {{ state.blog.posts }}
    <div class="row">
      <div class="col">
        <!-- NOTE Account Details for Blog Owner -->
        <router-link :to="{name: 'Account', params: {id: state.blog.creator.id}}"></router-link>
      </div>
      <!-- NOTE This v-if disables the input form if the User does not own the blog -->
      <div class="col" v-if="state.account.id === state.project.creatorId">
        <!-- NOTE Form Element to Add a Blog Entry -->
      </div>
      <!-- <div class="col" v-for="blog in state.blogs.entries" :key="blog.id">
        NOTE Blog Element that renders individual Blog Entries
      </div> -->
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import blogsService from '../services/BlogsService'
import Notification from '../utils/Notification'

export default {
  name: 'BlogDetails',
  setup() {
    const route = useRoute()
    const state = reactive({
      blog: computed(() => AppState.activeBlog),
      newBlog: {},
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
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
