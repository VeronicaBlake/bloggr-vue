<template>
  <div class="about text-center">
    <div v-if="state.activeProfile">
      <h1>Welcome {{ state.activeProfile.name }}</h1>
      <img class="rounded" :src="state.activeProfile.picture" alt="" />
      <p>{{ account.email }}</p>
    </div>
    <!-- CREATE POST FORM ELEMENT
    Featuring a TItle and Image -->
  </div>
  <h2>My Blogs</h2>
  <div class="row">
    <!-- NOTE BLOG ICONS DISPLAY ON PAGE
      Must create BlogPost component-->
    <BlogPost v-for="blog in state.activeBlogs" :key="blog.id" :blog="blog" />
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
import blogsService from '../services/BlogsService'
import accountService from '../services/AccountService'
import Notification from '../utils/Notification'

export default {
  name: 'Account',
  setup() {
    const route = useRoute()
    const state = reactive({
      newBlog: {},
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      activeBlogs: computed(() => AppState.activeBlogs),
      activeProfile: computed(() => AppState.activeProfile)
    })

    onMounted(async() => {
      await blogsService.getByProfileId(route.params.id)
      await accountService.getProfile(route.params.id)
    })

    return {
      state,
      async create() {
        try {
          await blogsService.create(state.newBlog)
          state.newPoject = {}
          Notification.toast('Successfully Created Blog!', 'success')
        } catch (error) {
          Notification.toast('Error ' + error, 'error')
        }
      }
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
