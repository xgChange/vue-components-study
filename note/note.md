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
