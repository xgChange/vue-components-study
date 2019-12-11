<template>
  <div class="tree-node">
    <ul>
      <li>
        <span class="tree-expand" @click="handleExpand">
          <span v-if="list.children && list.children.length && !list.expand">+</span>
          <span v-if="list.children && list.children.length && list.expand">-</span>
        </span>
        <i-chckbox v-if="showCheckbox" :value="list.checked" @input="handleCheck"></i-chckbox>
        <span>{{list.title}}</span>
        <!-- 子节点 -->
        <div v-if="list.expand">
          <tree-node
            v-for="(item,index) in list.children"
            :key="index"
            :list="item"
            :show-checkbox="showCheckbox"
          ></tree-node>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import iChckbox from '../checkbox/checkbox'
import { findComponentUpward } from '@/utils/assist.js'
export default {
  components: {
    iChckbox
  },
  name: 'treeNode',
  props: {
    list: {
      type: Object,
      default() {
        return {}
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tree: findComponentUpward(this, 'tree')
    }
  },
  methods: {
    handleExpand() {
      this.$set(this.list, 'expand', !this.list.expand)
      if (this.tree) {
        this.tree.emitEvent('on-toggle-expand', this.list)
      }
    },
    handleCheck(val) {
      let value = val === 'true' ? true : false
      this.updateTreeDown(this.list, value)
      if (this.tree) {
        this.tree.emitEvent('on-check-change', this.list)
      }
    },
    updateTreeDown(data, checked) {
      this.$set(data, 'checked', checked)

      if (data.children && data.children.length) {
        data.children.forEach(item => {
          this.updateTreeDown(item, checked)
        })
      }
    }
  },
  watch: {
    'list.children': {
      handler(data) {
        if (data) {
          const checkAll = !data.some(item => !item.checked)
          this.$set(this.list, 'checked', checkAll)
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
ul li {
  list-style: none;
}
</style>