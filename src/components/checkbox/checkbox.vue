<template>
  <label>
    <span>
      <input
        v-if="group"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        v-model="model"
        @change="changed"
      />
      <input v-else type="checkbox" :checked="currentValue" @change="changed" :disabled="disabled" />
    </span>
    <span>
      <slot></slot>
    </span>
  </label>
</template>

<script>
import { findComponentUpward } from '@/utils/assist.js'

export default {
  name: 'iCheckbox',
  data() {
    return {
      model: [],
      group: false,
      parent: null,
      currentValue: this.value
    }
  },
  props: {
    disabled: {
      type: Boolean
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
    label: {
      type: [String, Number, Boolean]
    }
  },
  watch: {
    value(val) {  // 监听父元素手动更改props的value，再实时同步到currentValue上
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel()
      } else {
        throw 'Value should be trueValue or falseValue'
      }
    }
  },
  mounted() {
    this.parent = findComponentUpward(this, 'iCheckboxGroup')
    if (this.parent) {
      this.group = true
    }

    if (this.group) {
      // this.parent.updateModel(true)
    } else {
      this.updateModel()
    }
  },
  methods: {
    changed(e) {
      if (this.disabled) {
        return false
      }
      let checked = e.target.checked
      this.currentValue = checked
      const value = checked ? this.trueValue : this.falseValue
      this.$emit('input', value)
      this.$emit('iFormItem', 'on-form-change', value)  // 向formItem组件派发一个事件，这样可以在form中校验
    },
    updateModel() {
      this.currentValue = this.value === this.trueValue
    }
  }
}
</script>

<style>
</style>