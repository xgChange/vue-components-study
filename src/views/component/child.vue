<template>
  <div>
    <input v-bind="$attrs" />
    <sun v-bind="$attrs" v-on="$listeners" @update="handle"></sun>
  </div>
</template>

<script>
import sun from './sun'
export default {
  components: {
    sun
  },
  inheritAttrs: false,
  props: ['foo'],
  methods: {
    handle() {
      console.log('q')
    }
  }
}
</script>

<style>
</style>