<template>
  <div>
    <tree-node
      v-for="(item, index) in cloneData"
      :key="index"
      :list="item"
      :show-checkbox="showCheckbox"
    ></tree-node>
  </div>
</template>

<script>
import treeNode from './tree-node'
import deepCopy from '@/utils/deepCopy.js'
import { findComponentDownward } from '@/utils/assist.js'

export default {
  name: 'tree',
  components: {
    treeNode
  },
  data() {
    return {
      cloneData: []
    }
  },
  props: {
    lists: {
      type: Array,
      default() {
        return []
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.cloneList()
  },
  watch: {
    lists() {
      this.cloneList()
    }
  },
  methods: {
    cloneList() {
      this.cloneData = deepCopy(this.lists)
    },
    emitEvent(name, data) {
      this.$emit(name, data)
    }
  }
}
</script>

<style scoped>
</style>