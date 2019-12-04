<template>
  <component :is="tagName" v-bind="tagProps">
    <slot></slot>
  </component>
</template>

<script>
// v-bind将一些额外的属性全部绑到了component上
export default {
  props: {
    to: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '_self'
    }
  },
  computed: {
    tagName() {
      return this.to === '' ? 'button' : 'a'
    },
    tagProps() {
      let props = {}

      if (this.to) {
        props = {
          target: this.target,
          href: this.to
        }
      }
      return props
    }
  }
}
</script>

<style>
</style>