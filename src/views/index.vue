<template>
  <div class="index">
    <div class="nav left">
      <ul>
        <li>
          <router-link to="/index/component_form">1：实现form表单</router-link>
        </li>
        <li>
          <router-link to="/index/component_checkbox">2：实现组合多选框组件checkgroup和checkbox</router-link>
        </li>
        <li>
          <router-link to="/index/component_display">3：动态渲染.vue文件组件</router-link>
        </li>
        <li>
          <router-link to="/index/component_alert">4：全局alert组件</router-link>
        </li>
        <li>
          <router-link to="/index/component_table">5：table组件</router-link>
        </li>
        <li>
          <router-link to="/index/component_table-slot">6：table组件(slot方式)</router-link>
        </li>
      </ul>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.index {
  display: flex;
  flex-direction: row;
}

.left > ul {
  list-style: none;
  padding: 0;
}
.left > ul > li {
  margin: 20px 0;
}
.right {
  flex: 1;
}
</style>