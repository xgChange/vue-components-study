# vue 组件笔记

## 父组件用了 slot，与其子组件的执行顺序

```html
<!-- 父组件 -->
<div>
  <p>我是父组件</p>
  <slot></slot>
</div>

<!-- 子组件 -->
<div>
  <p>我是子组件</p>
</div>

<!-- 调用 -->
<parent>
  <child></child>
</parent>
```

```javascript
  // 上述父子组件执行顺序
  /*
   *  1. 父组件 created
   *  2. 子组件 created
   *  3. 子组件 mounted
   *  4. 父组件mounted
  */

//  父组件
created(){
  this.$el  // undefined
  this.$el.children // [] 空数组
}

// 子组件
created(){
  this.$el // undefined
  this.$parent  // 父组件的VDOM对象, 可获取 $options.name之类的
}
mounted(){
  this.$parent  // 可以访问父组件的VDOM对象 this.$parent.$children[0].$el
}

```

## v-model 在 checkbox 中的应用

```html
<div>
  <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
  <label for="jack">Jack</label>
  <input type="checkbox" id="john" value="John" v-model="checkedNames" />
  <label for="john">John</label>
  <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
  <label for="mike">Mike</label>
  <br />
  <span>Checked names: {{ checkedNames }}</span>
</div>
```

```javascript
/**
 * 1. v-model绑定了一个数组，如果选中里面的input，它的值会被添加到数组上去["jack","john"]代表 jack和john被选中
 * 2. 如果v-model的值是String/Boolean/Number，input选中后,v-model会变为 true/false
 * 3. 因为v-model对应的是input和value. 在checkbox中对应着checked和change事件。其实就是通过v-model影响value，        value再影响checked
 */
export default {
  data() {
    return {
      checkedNames: ["Jack"]
    }
  }
}
```

## 使用 async-validator 做表单验证以及组件之间的通信

1.安装 yarn add async-validator

2.写校验规则 **(调用时的 js 处)**

```javascript
  ruleValidate: {
    name: [
      { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '邮箱不能为空', trigger: 'blur' },
      { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
    ],
    checkboxes: [
      { type: 'array', required: true, message: '请至少选择一个吃的', trigger: 'change' }
    ]
  }
```

3.调用 form 表单以及相应的 form-item **(调用时的 html 处)**

```html
<i-form :model="formValidate" :rules="ruleValidate" ref="ruleForm">
  <i-form-item label="用户名" prop="name">
    <i-input v-model="formValidate.name"></i-input>
  </i-form-item>
  <i-form-item label="邮箱" prop="email">
    <i-input v-model="formValidate.email"></i-input>
  </i-form-item>
  <i-form-item label="今天吃啥" prop="checkboxes">
    <i-checkbox-group v-model="formValidate.checkboxes">
      <i-checkbox label="luobo">酸萝卜</i-checkbox>
      <i-checkbox label="yuxincao">鱼腥草</i-checkbox>
      <i-checkbox label="mifen">怀化米粉</i-checkbox>
      <i-checkbox label="all">我全都要</i-checkbox>
    </i-checkbox-group>
  </i-form-item>
</i-form>
```

4.form(父组件)和 form-item(组件)之间的通信 **(form 组件, form.vue)**

```javascript
  /**
   * 1. 因为form-item组件是在form组件的插槽内，所以通过provide将自己的this暴露出去
   * 2. 子组件中通过inject注入即可，通过this.form就可以获取到父组件的this
   */
  provide(){  // 父组件 provide
    return {
      form: this
    }
  }
  /*
  * 1.子组件引入，可以通过this.form调用
    2. 这样子组件可以获取(调用时)传入父组件的 model 和 rules
  */
  inject: ['form']
```

5.使用提前写好的用于组件之间通信的工具函数 assist.js

- `findComponentUpward` 向上找到最近的指定组件
- `findComponentsUpward` 向上找到所有的指定组件
- `findComponentDownward` 向下找到最近的指定组件
- `findComponentsDownward` 向下找到所有指定的组件

```javascript
  /*  i-input 组件

    1.调用时v-model传入i-input组件中,在@input中把改变的value传回form-item组件中
    2. 分别回传change和blur事件
  */
  handleInput(e) {
    let targetVal = e.target.value
    this.currentVal = targetVal
    this.$emit('input', targetVal)
    this.dispatch('iFormItem', 'on-form-change', targetVal)
  },
  handleBlur() {
    this.dispatch('iFormItem', 'on-form-blur', this.currentVal)
  }
```

- 在 form-item 组件中去监听触发的事件 **(form-item.vue)**

```javascript
/**
 * 必须要在mounted中去监听 (参考: 父组件用了 slot，与其子组件的执行顺序)
 */

mounted() {
  if (this.prop) {
    this.dispatch('iForm', 'on-form-item-add', this)
    this.$on('on-form-change', (val) => {
      this.validate("change")
    })
    this.$on('on-form-blur', (val) => {
      this.validate('blur')
    })
    this.setRules() // 用来获取所有规则中required字段,赋值给this.required，然后通过它去标记哪些form-item是required
    this.initiaValue = this.fieldVal   // 缓存初始值等于form的model
  }
},
```

6.接下来就是校验了 **(form-item.vue)**

```javascript
  validate(trigger, callback = function () { }) {
      let rule = this.getFilterRules(trigger) // 获取指定的类型的规则; 例如 blur, change
      if (!rule || rule.length === 0) {
        return true
      }
      /**
       * async-validator 的验证
       */
      this.validateState = 'validating'       // 校验中
      let descriptor = {}
      descriptor[this.prop] = rule
      const validator = new AsyncValidator(descriptor)
      let model = {}
      model[this.prop] = this.fieldVal  // 这里的fieldVal是通过计算属性计算的，来自form组件的model(外界调用时传入的那个formValidate),因为每个form-item都是通过v-model绑定的，所以每当value变化都会同步到外面的model.

      validator.validate(model, (errors) => {
        this.validateState = !errors ? 'success' : 'error'
        this.validateMessage = errors ? errors[0].message : ''
        callback(this.validateMessage)
      })
    }
```

7.点击 button 按钮提交和重置事件 **(调用时的 js 处)**

```javascript
  submitForm() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.formValidate)
          alert("提交成功")
        } else {
          return false
        }
      })
    },
  resetForm() {
    this.$refs.ruleForm.resetFileds()
  }
```

## Vue-cli3 报错(vue 的版本问题)

> [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

- 在使用 Vue.js 2 时，有独立构建（standalone）和运行时构建（runtime-only）两种版本
  Vue CLI 3 默认使用了 vue.runtime.js，它不允许编译 template 模板，因为我们在 Vue.extend 构造实例时，用了 `template` 选项，所以会报错。解决方案有两种，一是手动将 template 改写为 Render 函数，但这成本太高；另一种是对 Vue CLI 3 创建的工程做简单的配置。我们使用后者。

```javascript
module.exports = {
  runtimeCompiler: true
}
```
