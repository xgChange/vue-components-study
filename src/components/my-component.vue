<template>
  <div>
    <Render :render="render"></Render>
  </div>
</template>

<script>
import Render from "./render";

export default {
  components: { Render },
  props: {
    render: Function
  }
}
</script>

<style scoped>
</style>