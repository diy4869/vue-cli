<template>
  <div id="app">
    app.vue
    <router-link to="home">首页</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      message: 'hello world'
    }
  }
}
</script>
<style scoped lang="scss">
.test {
  color: teal;
}
</style>
