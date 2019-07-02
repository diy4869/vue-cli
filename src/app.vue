<template>
  <div>
    <hello-world></hello-world>
  </div>
</template>
<script>
import test from './views/test.vue'
export default {
  components: {
    'hello-world': test
  },
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
