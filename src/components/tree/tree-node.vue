<template>
  <div class="tree-node">
    <ul>
      <li>
        <span class="tree-expand" @click="handleExpand">
          <span v-if="list.children && list.children.length && !list.expand">+</span>
          <span v-if="list.children && list.children.length && list.expand">-</span>
        </span>
        <i-chckbox v-if="showCheckbox" v-model="list.checked"></i-chckbox>
        <span>{{list.title}}</span>
        <!-- 子节点 -->
        <div v-if="list.expand">
          <tree-node v-for="(item,index) in list.children" :key="index" :list="item"></tree-node>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import iChckbox from '../checkbox/checkbox'
export default {
  components: {
    iChckbox
  },
  name: 'treeNode',
  props: {
    list: {
      type: Object
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleExpand() {

    },
  }
}
</script>

<style scoped>
ul li {
  list-style: none;
}
</style>