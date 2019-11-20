<template>
  <div class="checkbox">
    <i-checkbox v-model="single">选项1</i-checkbox>
    <hr />
    <i-checkbox-group v-model="type">
      <i-checkbox label="option2">选项2</i-checkbox>
      <i-checkbox label="option3">选项3</i-checkbox>
      <i-checkbox label="option4">选项4</i-checkbox>
    </i-checkbox-group>
    <button @click="handle">点击</button>
  </div>
</template>

<script>
import ICheckbox from "@/components/checkbox/checkbox.vue";
import ICheckboxGroup from "@/components/checkbox/checkbox-group.vue";
export default {
  data() {
    return {
      single: 0,
      type: ["option3"]
    };
  },
  components: {
    ICheckbox,
    ICheckboxGroup
  },
  methods: {
    handle() {
      this.single = !this.single
    }
  }
};
</script>

<style scoped>
.checkbox {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
