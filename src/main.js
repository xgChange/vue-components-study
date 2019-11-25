import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import Alert from "@/components/alert/alert.js"
Vue.config.productionTip = false
Vue.prototype.$message = Alert

new Vue({
  render: h => h(App),
  router
}).$mount("#app")
