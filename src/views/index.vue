<template>
  <div class="index">
    <div class="nav left">
      <ul>
        <li>
          <router-link to="/index/component_form">实战1：实现form表单</router-link>
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
.index {
  display: flex;
  flex-direction: row;
}

.left > ul {
  list-style: none;
  padding: 0;
}
.right {
  flex: 1;
}
</style>