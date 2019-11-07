<template>
  <div class="checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'iCheckboxGroup',
  props: {
    value: {
      type: Array
    }
  }
}
</script>

<style>
</style>