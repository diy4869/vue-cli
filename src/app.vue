<template>
  <div id="app">
    <router-link to="home">首页 测试很好</router-link>
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
