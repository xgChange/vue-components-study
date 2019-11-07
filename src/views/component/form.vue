<template>
  <div id="form">
    <i-form :model="formValidate" :rules="ruleValidate" ref="ruleForm">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="email">
        <i-input v-model="formValidate.email"></i-input>
      </i-form-item>
      <i-form-item label="复选" prop="checkbox">
        <i-checkbox v-model="formValidate.checkbox">选项二</i-checkbox>
      </i-form-item>
    </i-form>
    <button @click="submitForm">提交</button>
    <button @click="resetForm">重置</button>
  </div>
</template>

<script>
import iForm from "@/components/form/form"
import iFormItem from "@/components/form/form-item"
import iInput from '@/components/input/input'
import iCheckbox from '@/components/checkbox/checkbox.vue'
import { findComponentDownward, findComponentsDownward } from "@/utils/assist"

export default {
  name: 'app',
  data() {
    return {
      formValidate: {
        name: '',
        email: '',
        checkbox: true
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        checkbox: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("提交成功")
        } else {
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFileds()
    }
  },
  mounted() {
    let children = findComponentsDownward(this, 'iInput')
  },
  components: {
    iForm,
    iFormItem,
    iInput,
    iCheckbox
  },

}
</script>

<style>
#form {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>