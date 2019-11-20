<template>
  <div class="display">
    <h3>动态渲染 .vue组件-display</h3>
    <i-display :code="code"></i-display>
  </div>
</template>

<script>
import iDisplay from "@/components/display/display.vue"
import defaultCode from "../default-code"
export default {
  components: {
    iDisplay
  },
  data() {
    return {
      code: defaultCode
    }
  }
}
</script>

<style scoped>
.display {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>