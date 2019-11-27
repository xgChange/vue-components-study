<template>
  <div class="table">
    <i-table class="i_table"></i-table>
  </div>
</template>

<script>
import iTable from "@/components/table-render/table"
export default {
  components: {
    iTable
  }
}
</script>

<style scoped>
.table {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.i_table {
  margin: auto;
}
</style>