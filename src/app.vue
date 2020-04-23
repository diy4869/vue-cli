<template>
  <div id="app">
    <div>hello world</div>
    <button @click="btn('add')">
      增加
    </button>
    <button @click="btn('reduce')">
      减少
    </button>
    <h1>count：{{ count }}</h1>
  </div>
</template>
<script lang="ts">
import { ref, onMounted, onUpdated, onUnmounted } from 'vue'
export default {
  setup () {
    onUpdated(() => {
      console.log('onUpdated')
    })
    onUnmounted(() => {
      console.log('onUnmounted')
    })
    onMounted(() => {
      console.log('onMounted')
    })
    const count = ref(0)
    const btn = args => {
      args === 'add' ? count.value++ : count.value--
    }
    console.log(count)
    console.log(ref)

    return {
      count,
      btn
    }
  }
}
</script>
<style scoped lang="scss">
.test {
  color: teal;
}
</style>
