<template>
  <div class="blog-post col-md-3">
    <div class="card shadow blog-card p-2 my-2">
      <!-- Link to Individual Blog when clicked -->
      <router-link :to="{name:'BlogDetails', params: {id: blog.id}}">
        <h3><u>{{ blog.title }}</u></h3>
        <h6>
          <span><img class="rounded-circle img-icon" :src="blog.creator.picture" alt="Creator Image"></span> {{ blog.creator.name }}
        </h6>
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
