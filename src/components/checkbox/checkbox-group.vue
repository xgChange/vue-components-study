<template>
  <div class="checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'iCheckboxGroup',
  props: {
    value: {
      type: Array,
      default() {  //对象或者数组的默认值必须从一个函数获取
        return []
      }
    }
  }
}
</script>

<style>
</style>