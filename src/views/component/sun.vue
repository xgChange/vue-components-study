<template>
  <div>
    <p @click="handle => $emit('update', 'w')">我是sun{{coo}}</p>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ['coo']
}
</script>

<style>
</style>