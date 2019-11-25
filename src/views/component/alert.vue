<template>
  <div class="alert">
    <h3>全局提示组件</h3>
    <button @click="openMsg1">打开消息1</button>
    <button @click="openMsg2">打开消息2</button>
  </div>
</template>

<script>

export default {
  methods: {
    openMsg1() {
      this.$message.info({
        message: '<h2>消息盒子1</h2>'
      })
    },
    openMsg2() {
      this.$message.info({
        message: '消息盒子2',
        duration: 5,
        close: true
      })
    }
  }
}
</script>

<style scoped>
.alert {
  text-align: center;
  margin-top: 60px;
}
</style>