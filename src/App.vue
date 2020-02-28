<template>
  <div id="app">
    <div class="layout">
      <Layout>
        <Header style="height: 77px"><blog-head></blog-head></Header>
        <Content><router-view></router-view></Content>
        <Footer><blog-foot></blog-foot></Footer>
      </Layout>
    </div>
  </div>
</template>
<script>
  import BlogHead from "./components/BlogHead"
  import BlogList from "./components/BlogList"
  import BlogFoot from "./components/BlogFoot"
  export default {
    components: {
      BlogHead,
      BlogList,
      BlogFoot,
    }
  }
</script>
<style>
  html,body,#app {height: 100%;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: auto;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
