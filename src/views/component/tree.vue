<template>
  <div class="tree">
    <tree
      :lists="list"
      :show-checkbox="true"
      @on-toggle-expand="handleExpand"
      @on-check-change="handleChecked"
    ></tree>
  </div>
</template>

<script>
import Tree from '@/components/tree/tree.vue'
export default {
  components: {
    Tree
  },
  data() {
    return {
      list: [
        {
          title: 'parent 1-1',
          expand: true,
          children: [
            {
              title: 'leaf 1-1-1',

              children: [
                {
                  title: 'leaf 1-1-1-1',
                }
              ]
            },
            {
              title: 'leaf 1-1-2'
            }
          ]
        },
        {
          title: 'parent 1-2',
          children: [
            {
              title: 'leaf 1-2-1'
            },
            {
              title: 'leaf 1-2-1'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleExpand(d1, d2) {
      // console.log(d1) // 当前项的节点数据
    },
    handleChecked(d1) {
      // console.log(d1)
    }
  }
}
</script>

<style>
</style>