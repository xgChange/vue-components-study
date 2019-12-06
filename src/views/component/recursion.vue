<template>
  <div class="recursion">
    <detail-list :list="list"></detail-list>
  </div>
</template>

<script>
import detailList from '@/components/recursion/detail-list.vue'
export default {
  data() {
    return {
      list: [
        {
          title: 'parent 1-1',
          expand: true,
          children: [
            {
              title: 'leaf 1-1-1'
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
  components: {
    detailList
  }
}
</script>

<style>
</style>