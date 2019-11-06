<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'iForm',
  provide() {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    }
  },
  data() {
    return {
      fields: []
    }
  },
  created() {
    /**
     * 缓存所有的form-item实例，以便于点击提交按钮时全部校验，或者重置按钮全部数据
     */
    this.$on('on-form-item-add', (val) => {
      if (val) this.fields.push(val)
    })

    this.$on('on-form-item-remove', (val) => {
      if (val) this.fields.splice(this.fields.indexOf(val), 1)
    })
  },
  methods: {
    // 重置所有表单
    resetFileds() {
      this.fields.forEach(item => {
        item.resetForm()
      })
    },

    /* 
      校验表单数据，callback和promise两种方，抛出的是valid: true/false
    */
    validate(callback) {
      return new Promise((resolve, reject) => {
        let valid = true
        let count = 0
        this.fields.forEach(field => {
          field.validate('', err => {
            if (err) {
              valid = false
            }
            if (++count === this.fields.length) {
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    }
  }
}
</script>

<style>
</style>