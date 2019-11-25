<template>
  <div ref="display"></div>
</template>

<script>
import Vue from 'vue'
import randomStr from '@/utils/random_str.js'

export default {
  props: {
    code: {
      type: String
    }
  },
  data() {
    return {
      html: '',
      css: '',
      js: '',
      component: null
    }
  },
  watch: {
    code() {
      this.renderCode()
      this.destroyCode()
    }
  },
  mounted() {
    this.renderCode()
  },
  methods: {
    // 用来截取对应标签里面的内容
    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`)
      let openingTag = source.match(regex)
      if (!openingTag) return ''
      else openingTag = openingTag[0]
      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`))
    },
    splitCode() {
      let template = `<div id='app'>${this.getSource(this.code, 'template')}</div>`
      let js = this.getSource(this.code, 'script').replace(/export default/, 'return ')
      let css = this.getSource(this.code, 'style')
      this.html = template
      this.js = js
      this.css = css
    },
    renderCode() {
      this.splitCode()
      const jsObj = new Function(this.js)() // 执行this.js，返回的是一个对象
      jsObj.template = this.html
      const Component = Vue.extend(jsObj)
      this.component = new Component().$mount()
      this.$refs.display.appendChild(this.component.$el)

      // 将css挂上去
      if (this.css !== '') {
        let head = document.getElementsByTagName('head')[0]
        let style = document.createElement('style')
        style.type = 'text/css'
        style.id = randomStr()
        style.innerHTML = this.css
        head.appendChild(style)
      }
    },
    destroyCode() {
      const target = document.getElementById(randomStr())
      // document.getElementsByTagName('head')[0].removeChild(target)
      if (target) target.parentNode.removeChild(target)
      if (this.component) {
        this.$refs.display.removeChild(this.component.$el)
        this.component.$destroy()
        this.component = null
      }
    }
  },
  beforeDestroy() {
    this.destroyCode()
  }
}
</script>

<style>
</style>