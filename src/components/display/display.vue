<template>
  <div ref="display"></div>
</template>

<script>
import randomStr from '@/utils/random_str.js'
import Vue from 'vue'
export default {
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      html: '',
      css: '',
      js: '',
      component: null,
      id: randomStr()
    }
  },
  watch: {
    code() {
      this.destroyCode()
      this.renderCode()
    }
  },
  mounted() {
    // console.log(randomStr())
    this.renderCode()
  },
  methods: {
    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`)
      let openingTag = source.match(regex)

      if (!openingTag) return ''
      else openingTag = openingTag[0]
      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`))
    },
    splitCode() {
      const script = this.getSource(this.code, 'script').replace(/export default/, 'return ')
      const style = this.getSource(this.code, 'style')
      const template = `<div id="app">${this.getSource(this.code, 'template')}</div>`
      this.js = script
      this.css = style
      this.html = template
    },
    renderCode() {
      this.splitCode()

      if (this.html !== '' && this.js !== '') {
        const parseString = new Function(this.js)()
        parseString.template = this.html
        const Component = Vue.extend(parseString)
        this.component = new Component().$mount()
        this.$refs.display.appendChild(this.component.$el)
        if (this.css !== '') {
          const style = document.createElement('style')
          style.type = 'text/css'
          style.id = this.id
          style.innerHTML = this.css
          document.getElementsByTagName('head')[0].appendChild(style)
        }
      }
    },
    destroyCode() {
      const $target = document.getElementById(this.id)
      if ($target) $target.parentNode.removeChild($target)  // 移除style节点

      if (this.component) {
        this.$refs.display.removeChild(this.component.$el)  // dom节点移除
        this.component.$destroy() // vdom对象移除
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
