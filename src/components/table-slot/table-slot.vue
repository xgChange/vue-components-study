<template>
  <table>
    <thead>
      <tr>
        <th v-for="col in columns" :key="col.key">{{col.title}}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in data" :key="index">
        <td v-for="col in columns" :key="col.key">
          <template v-if="'render' in col">
            <render :row="row" :col="col" :index="index" :render="col.render"></render>
          </template>
          <template v-else-if="'slot' in col">
            <slot :col="col" :row="row" :index="index" :name="col.slot"></slot>
          </template>
          <template v-else>{{row[col.key]}}</template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Render from './render'
export default {
  components: {
    Render
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
table {
  width: 80%;
  border: 1px solid #ccc;
  border-spacing: 0;
  border-collapse: collapse;
}
table th {
  background: #f7f7f7;
  color: #5c6b77;
  font-weight: 600;
  white-space: nowrap;
}
table td,
table th {
  border: 1px solid #e9e9e9;
  padding: 8px 16px;
  text-align: left;
}
</style>