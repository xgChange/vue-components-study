import Vue from "vue"
import Alert from "./alert.vue"

Alert.newInstance = () => {
  let instance = new Vue({
    render: h => h(Alert)
  })
  const component = instance.$mount()
  document.body.appendChild(component.$el)
  let alert = instance.$children[0] // 拿到Alert实例
  return {
    add(notice) {
      alert.add(notice)
    },
    remove(name) {
      alert.remove(name)
    }
  }
}

export default Alert
