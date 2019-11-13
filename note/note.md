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
    };
  }
};
```
