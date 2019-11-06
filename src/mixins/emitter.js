function broadCast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      // 如果这一层没找到就去递归的找
      broadCast.call(child, componentName, eventName, params);
    }
  });
}

export default {
  methods: {
    // 子组件向上通知父组件
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      // 找到了指定的组件名
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },

    // 父组件向下通知子组件
    broadCast(componentName, eventName, params) {
      broadCast.call(this, componentName, eventName, params);
    }
  }
};
