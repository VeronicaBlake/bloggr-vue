<template>
  <div class="blog-post col-md-4">
    <div class="card shadow flex-grow-1 blog-card p-2 my-2">
      <!-- Link to Individual Blog when clicked -->
      <router-link :to="{name:'BlogDetails', params: {id: blog.id}}">
        <h5 class="text-left" v-if="blog.creator">
          <span><img class="rounded-circle img-icon" :src="blog.creator.picture" alt="Creator Image"></span> {{ blog.creator.name }}
        </h5>
        <h5 v-else>
          LEARN TO CODE YOU LAZY $#@&!
        </h5>
        <h4 class="mt-3">
          <u>{{ blog.title }}</u>
        </h4>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPost',
  props: {
    blog: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .img-icon {
    width: 2rem;
  }

  .blog-card {
    height: 10rem
  }
</style>
