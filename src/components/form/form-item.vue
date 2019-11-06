<template>
  <div class="form-item">
    <label v-if="label" :class="{'i-form-item-label-required': isRequired}">{{label}}</label>
    <div class="form-item-compont">
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-errmsg">{{validateMessage}}</div>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator';
import emitter from "@/mixins/emitter"
import { findBrothersComponents } from "@/utils/assist"

export default {
  mixins: [emitter],
  name: 'iFormItem',
  props: {
    label: {
      type: String
    },
    prop: {
      type: String
    }
  },
  inject: ['form'],
  data() {
    return {
      isRequired: false,
      validateState: '',      //校验状态
      validateMessage: ''     //校验信息
    }
  },
  methods: {
    // 校验
    validate(trigger, callback = function () { }) {
      let rule = this.getFilterRules(trigger)
      if (!rule || rule.length === 0) {
        return true
      }

      /**
       * async-validator 的验证
       */
      this.validateState = 'validating'       // 校验中
      let descriptor = {}
      descriptor[this.prop] = rule
      const validator = new AsyncValidator(descriptor)
      let model = {}
      model[this.prop] = this.fieldVal
      validator.validate(model, (errors) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage)
      })

    },

    // 获取指定的form规则
    getRules() {
      let formRules = this.form.rules
      formRules = formRules ? formRules[this.prop] : []
      return [].concat(formRules || []) // 转化为真数组
    },

    //设置rules, 显示是否 isRequired
    setRules() {
      let rules = this.getRules()
      if (rules.length) {
        rules.every((rule) => {
          this.isRequired = rule.required
        })
      }
    },

    // 过滤出符合要求的rule规则，change和blur
    getFilterRules(trigger) {
      let rules = this.getRules()
      return rules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1)
    },

    // 重置当前的form-item
    resetForm() {
      this.validateMessage = ''
      this.validateState = ''

      this.form.model[this.prop] = this.initiaValue
    }
  },
  computed: {
    fieldVal() {  // 获取form的model的数据, input触发的事件把值传回到了form.model里面
      return this.form.model[this.prop]
    }
  },
  mounted() {
    if (this.prop) {
      this.dispatch('iForm', 'on-form-item-add', this)
      this.$on('on-form-change', (val) => {
        this.validate("change")
      })
      this.$on('on-form-blur', (val) => {
        this.validate('blur')
      })
      this.setRules()
      this.initiaValue = this.fieldVal   // 缓存初始值等于form的model
    }
  },
  // 组件销毁前，将实例从form的缓存中移除
  beforeDestroy() {
    this.dispatch('iForm', 'on-form-item-remove', this)
  }
}
</script>

<style scoped>
.i-form-item-label-required::before {
  content: "*";
  color: red;
}
.i-form-item-errmsg {
  color: red;
  font-size: 12px;
}
</style>