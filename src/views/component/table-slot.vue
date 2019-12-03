<template>
  <div class="table">
    <h3>这是table(slot方式)</h3>
    <i-table class="i_table" :data="data1" :columns="columns1" ref="table">
      <template v-slot:name="{row, index}">
        <input v-if="editIndex === index" v-model="editName" type="text" />
        <span v-else>{{row.name}}</span>
      </template>

      <template v-slot:age="{row, index}">
        <input v-if="editIndex === index" v-model="editAge" type="text" />
        <span v-else>{{row.age}}</span>
      </template>

      <template v-slot:birthday="{row, index}">
        <input v-if="editIndex === index" v-model="editBirthday" type="text" />
        <span v-else>{{getBirthday(row.birthday)}}</span>
      </template>

      <template v-slot:action="{row, index}">
        <div v-if="editIndex === index">
          <button @click="handleSave(row, index)">保存</button>
          <button @click="handleCancel">取消</button>
        </div>
        <button v-else @click="handleEdit(row, index)">修改</button>
      </template>
    </i-table>
  </div>
</template>

<script>
import iTable from "@/components/table-slot/table-slot"
export default {
  components: {
    iTable
  },
  data() {
    return {
      editIndex: -1,
      editName: '',
      editAge: '',
      editBirthday: '',
      editAddress: '',
      columns1: [
        {
          title: '姓名',
          key: 'name',
          // slot: 'name'
          render: (h, { row, col, index }) => {
            return h('div', this.$refs.table.$scopedSlots.name({
              row,
              col,
              index
            }))
          }
        },
        {
          title: '年龄',
          key: 'age',
          slot: 'age'
        },
        {
          title: '出生日期',
          key: 'birthday',
          slot: 'birthday'
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      data1: []
      // data1: [
      //   {
      //     name: '王小明',
      //     age: 18,
      //     birthday: '919526400000',
      //     address: '北京市朝阳区芍药居'
      //   },
      //   {
      //     name: '张小刚',
      //     age: 25,
      //     birthday: '696096000000',
      //     address: '北京市海淀区西二旗'
      //   },
      //   {
      //     name: '李小红',
      //     age: 30,
      //     birthday: '563472000000',
      //     address: '上海市浦东新区世纪大道'
      //   },
      //   {
      //     name: '周小伟',
      //     age: 26,
      //     birthday: '687024000000',
      //     address: '深圳市南山区深南大道'
      //   }
      // ]
    }
  },
  mounted() {
    this.data1 = [
      {
        name: '王小明',
        age: 18,
        birthday: '919526400000',
        address: '北京市朝阳区芍药居'
      },
      {
        name: '张小刚',
        age: 25,
        birthday: '696096000000',
        address: '北京市海淀区西二旗'
      },
      {
        name: '李小红',
        age: 30,
        birthday: '563472000000',
        address: '上海市浦东新区世纪大道'
      },
      {
        name: '周小伟',
        age: 26,
        birthday: '687024000000',
        address: '深圳市南山区深南大道'
      }
    ]
  },
  methods: {
    getBirthday(d) {
      const date = new Date(parseInt(d))
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${year}-${month}-${day}`
    },
    handleSave(row, index) {
      this.data1[index].name = this.editName
      this.data1[index].age = this.editAge
      this.data1[index].birthday = this.editBirthday
      this.data1[index].address = this.editAddress
      this.editIndex = -1
    },
    handleEdit(row, index) {
      this.editName = row.name
      this.editAge = row.age
      this.editBirthday = row.birthday
      this.editAddress = row.editAddress
      this.editIndex = index
    },
    handleCancel() {
      this.editIndex = -1
    }
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