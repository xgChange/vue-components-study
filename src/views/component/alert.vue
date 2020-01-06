<template>
  <div class="alert">
    <h3>全局提示组件</h3>
    <i-button to="a">点击</i-button>
    <button @click="openMsg1">打开消息1</button>
    <button @click="openMsg2">打开消息2</button>
    <div>
      <child :foo="foo" :coo="coo" placeholder="这是占位符" @update="handle"></child>
    </div>
  </div>
</template>

<script>
import iButton from '@/components/button/button.vue'
import Child from './child'
export default {
  data() {
    return {
      a: "span",
      foo: 'foo',
      coo: 'coo'
    }
  },
  components: {
    iButton,
    Child
  },
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
    },
    handle(e) {
      console.log(e)
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