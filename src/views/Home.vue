<template>
  <div class="home">
    <blog-list></blog-list>
  </div>
</template>

<script>
import BlogList from "../components/BlogList"
export default {
  name: 'home',
  components: {
    BlogList
  }
}
</script>
