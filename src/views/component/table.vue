<template>
  <div class="table">
    <h3>这是table(render方式)</h3>
    <i-table class="i_table" :data="data1" :columns="columns1"></i-table>
  </div>
</template>

<script>
import iTable from "@/components/table-render/table"
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
          render: (h, { row, col, index }) => {
            let edit = null
            if (this.editIndex === index) {
              edit = h('input', {
                domProps: {
                  value: this.editName
                },
                on: {
                  input: (e) => {
                    this.editName = e.target.value
                  }
                }
              })
            } else {
              edit = row.name
            }
            return h('div', [
              edit
            ])
          }
        },
        {
          title: '年龄',
          key: 'age'
        },
        {
          title: '出生日期',
          key: 'birthday',
          render: (h, { row, col, index }) => {
            let edit = null
            if (this.editIndex === index) {
              edit = [h('input', {
                domProps: {
                  value: this.editBirthday
                },
                on: {
                  input: (e) => {
                    this.editBirthday = e.target.value
                  }
                }
              })]
            } else {
              const date = new Date(parseInt(row.birthday))
              const year = date.getFullYear()
              const month = date.getMonth() + 1
              const day = date.getDate()
              edit = h('span', `${year}-${month}-${day}`)
            }
            return h('div', [edit])
          }
        },
        {
          title: '地址',
          key: 'address'
        },
        {
          title: '操作',
          render: (h, { row, col, index }) => {
            if (this.editIndex === index) {
              return [
                h('button', {
                  on: {
                    click: () => {
                      this.data1[index].name = this.editName
                      this.data1[index].age = this.editAge
                      this.data1[index].birthday = this.editBirthday
                      this.data1[index].address = this.editAddress
                      this.editIndex = -1
                    }
                  }
                }, '保存'),
                h('button', {
                  style: {
                    marginLeft: '6px'
                  },
                  on: {
                    click: () => {
                      this.editIndex = -1
                    }
                  }
                }, '取消')]
            } else {
              return h('button', {
                on: {
                  click: () => {
                    this.editName = row.name
                    this.editAge = row.age
                    this.editBirthday = row.birthday
                    this.editAddress = row.address
                    this.editIndex = index
                  }
                }
              }, '修改')
            }
          }
        }
      ],
      data1: [
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