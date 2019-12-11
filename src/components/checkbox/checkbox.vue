<template>
  <label>
    <span>
      <template v-if="group">
        <input
          type="checkbox"
          :disabled="disabled"
          :value="label"
          v-model="model"
          @change="changed"
        />
      </template>

      <input v-else type="checkbox" :checked="currentValue" @change="changed" :disabled="disabled" />
    </span>
    <span>
      <slot></slot>
    </span>
  </label>
</template>

<script>
/**
 * 1. 当checkbox单独使用使
 * 2. 当checkbox的父元素是form-item
 * 3. 当checkbox的父元素是checkgroup时
 */
import { findComponentUpward } from '@/utils/assist.js'
import emitter from '@/mixins/emitter'

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
  mixins: [emitter],
  props: {
    disabled: {
      type: Boolean
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    label: {
      type: [String, Number, Boolean]
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: false
    },
  },
  watch: {
    value(val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel()
      }
    }
  },
  mounted() {
    this.parent = findComponentUpward(this, 'iCheckboxGroup')

    if (this.parent) {
      this.group = true
    }

    if (this.group) {
      this.parent.updateModel(true)
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
      const value = `${checked}`
      this.$emit('input', value)
      if (this.group) {
        this.parent.changed(this.model) //  将改变的model传回给checkbox-group
      } else {
        this.dispatch('iFormItem', 'on-form-change', value)  // 向formItem组件派发一个事件，这样可以在form中校验
        this.$emit('on-change', value)
      }
    },
    updateModel() {
      this.currentValue = this.value

    }
  }
}
</script>

<style>
</style>