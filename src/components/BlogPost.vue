<template>
  <div class="blog-post col">
    <div>
      <!-- Link to Individual Blog when clicked -->
      <router-link :to="{name:'BlogDetails', params: {id: blog.id}}" />
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
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
