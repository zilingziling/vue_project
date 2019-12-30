<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
  // mounted() {
  //   window.addEventListener('message', this.receiveMessage, false)
  // },
  // methods: {
  //   receiveMessage(event) {
  //     const origin = event.origin
  //     if (origin !== 'http://172.16.3.55:9528') return
  //     alert(event.data)
  //     // 事务处理代码
  //   }
  // }
}
</script>
