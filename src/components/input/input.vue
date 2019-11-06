<template>
  <div>
    <input type="text" :value="currentVal" @input="handleInput" @blur="handleBlur" />
  </div>
</template>

<script>
import emitter from "../../mixins/emitter"
import { findComponentUpward, findComponentsUpward } from "@/utils/assist.js"

export default {
  name: 'iInput',
  mixins: [emitter],
  data() {
    return {
      currentVal: this.value
    }
  },
  props: {
    value: {
      type: String
    }
  },
  watch: {
    value(val) {
      this.currentVal = val
    }
  },
  mounted() {
    let parent = findComponentsUpward(this, 'iForm')
  },
  methods: {
    handleInput(e) {
      let targetVal = e.target.value
      this.currentVal = targetVal
      this.$emit('input', targetVal)
      this.dispatch('iFormItem', 'on-form-change', targetVal)
    },
    handleBlur() {
      this.dispatch('iFormItem', 'on-form-blur', this.currentVal)
    }
  }
}
</script>

<style>
</style>