<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <span>{{item.title}}</span>
      <detail-list v-if="item.children" :list="item.children"></detail-list>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailList",
  props: {
    list: {
      type: [Array]
    }
  }
}
</script>

<style>
</style>